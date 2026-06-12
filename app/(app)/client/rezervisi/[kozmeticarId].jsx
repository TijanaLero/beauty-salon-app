import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, FlatList, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../../../lib/api';

const WORK_START = 9;
const WORK_END = 17;
const SLOT_MINUTES = 30;

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function generateSlots() {
  const slots = [];
  for (let h = WORK_START; h < WORK_END; h++) {
    for (let min = 0; min < 60; min += SLOT_MINUTES) {
      slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
    }
  }
  return slots;
}

export default function RezervisanjeScreen() {
  const { kozmeticarId, name } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
const [slobodniSlotovi, setSlobodniSlotovi] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    fetchSlobodneTermine(selectedDate);
  }, [selectedDate]);

  const fetchSlobodneTermine = async (date) => {
    setLoadingSlots(true);
    try {
      const dateStr = formatDate(date);
      const data = await api.get('/reservations', {
        orderBy: '"kozmeticarId"',
        equalTo: `"${kozmeticarId}"`,
      });

      const zauzeti = new Set();
      if (data) {
        Object.values(data).forEach((r) => {
          if (r.date === dateStr && r.status === 'active') {
            zauzeti.add(r.time);
          }
        });
      }

      const svi = generateSlots();
      setSlobodniSlotovi(svi.filter((slot) => !zauzeti.has(slot)));
    } catch {
      setSlobodniSlotovi(generateSlots());
    } finally {
      setLoadingSlots(false);
    }
  };

  const onDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezervacija</Text>
      <Text style={styles.subtitle}>Kozmetičar: {name}</Text>

      <Text style={styles.label}>Odaberite datum:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.sectionTitle}>Dostupni termini</Text>
      
      {loadingSlots ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : (
        <FlatList
          data={slobodniSlotovi}
          keyExtractor={(item) => item}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.slot}>
              <Text style={styles.slotText}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Nema slobodnih termina za ovaj datum.</Text>}
          contentContainerStyle={styles.slotsGrid}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#718096', marginBottom: 28 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  dateButton: {
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 28,
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  dateText: { fontSize: 16, fontWeight: '600', color: '#2d3748' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  slotsGrid: { paddingBottom: 24 },
  slot: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bee3f8',
    backgroundColor: '#ebf8ff',
    alignItems: 'center',
  },
  slotText: { fontSize: 15, fontWeight: '600', color: '#2b6cb0' },
  empty: { color: '#a0aec0', textAlign: 'center', marginTop: 24 },
});