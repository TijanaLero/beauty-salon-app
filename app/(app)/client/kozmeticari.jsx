import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../../lib/api';

export default function KozmetičariScreen() {
  const [kozmetičari, setKozmetičari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchKozmetičari();
  }, []);

  const fetchKozmetičari = async () => {
    try {
      const data = await api.get('/users', {
        orderBy: '"role"',
        equalTo: '"kozmeticar"',
      });

      if (!data) {
        setKozmetičari([]);
        return;
      }

      const lista = Object.entries(data).map(([uid, info]) => ({ uid, ...info }));
      setKozmetičari(lista);
    } catch (e) {
      setError('Nije moguće učitati listu kozmetičara.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Odaberite kozmetičara</Text>

      <FlatList
        data={kozmetičari}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/(app)/client/rezervisi/[kozmeticarId]', params: { kozmeticarId: item.uid, name: item.name } })}
          >
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardEmail}>{item.email}</Text>
            <Text style={styles.cardArrow}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nema dostupnih kozmetičara.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    backgroundColor: '#f7fafc',
  },
  cardName: { flex: 1, fontSize: 16, fontWeight: '600' },
  cardEmail: { fontSize: 13, color: '#718096', marginRight: 8 },
  cardArrow: { fontSize: 22, color: '#a0aec0' },
  error: { color: '#e53e3e', textAlign: 'center' },
  empty: { textAlign: 'center', color: '#a0aec0', marginTop: 40 },
});