import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function RezervisanjeScreen() {
  const { kozmeticarId, name } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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
      <Text style={styles.placeholder}>Prikaz termina je u izradi.</Text>
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
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  placeholder: { color: '#a0aec0', fontSize: 14 },
});