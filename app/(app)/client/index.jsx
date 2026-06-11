import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export default function ClientHome() {
   const { user, logout } = useAuth();
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dobrodošli</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Odjava</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  email: { fontSize: 14, color: '#666', marginBottom: 32 },
  button: { backgroundColor: '#e53e3e', padding: 14, borderRadius: 8, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});