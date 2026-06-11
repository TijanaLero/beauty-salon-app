import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';

export default function ClientHome() {
   const { user, logout } = useAuth();
   const router = useRouter();
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dobrodošli</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(app)/client/kozmeticari')}>
        <Text style={styles.buttonText}>Rezerviši termin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={logout}>
        <Text style={[styles.buttonText, styles.secondaryText]}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  email: { fontSize: 14, color: '#718096', marginBottom: 40, textAlign: 'center' },
  button: {
    backgroundColor: '#2b6cb0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e53e3e' },
  secondaryText: { color: '#e53e3e' },
});