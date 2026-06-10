import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijava</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Lozinka"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Prijavi se</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/register" style={styles.link}>
        Nemate nalog? Registrujte se
      </Link>

      <Link href="/(auth)/forgot-password" style={styles.link}>
        Zaboravili ste lozinku?
      </Link>
    </View>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'Neispravna email adresa.';
    case 'auth/user-not-found': return 'Korisnik sa ovim emailom ne postoji.';
    case 'auth/wrong-password': return 'Pogrešna lozinka.';
    case 'auth/invalid-credential': return 'Pogrešan email ili lozinka.';
    case 'auth/too-many-requests': return 'Previše pokušaja. Pokušajte ponovo kasnije.';
    default: return 'Došlo je do greške. Pokušajte ponovo.';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: '#e53e3e',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2b6cb0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    color: '#2b6cb0',
    marginTop: 8,
    fontSize: 14,
  },
});