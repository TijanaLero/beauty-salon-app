import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Link za reset lozinke je poslat na vaš email.');
    } catch (e) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset lozinke</Text>
      <Text style={styles.subtitle}>
        Unesite email adresu i poslaćemo vam link za reset lozinke.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Pošalji link</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/login" style={styles.link}>
        Nazad na prijavu
      </Link>
    </View>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'Neispravna email adresa.';
    case 'auth/user-not-found': return 'Korisnik sa ovim emailom ne postoji.';
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
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
  success: {
    color: '#276749',
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