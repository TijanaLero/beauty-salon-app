import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, DB_URL } from '../../lib/firebase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');

    if (!name.trim()) return setError('Unesite ime i prezime.');
    if (password !== confirmPassword) return setError('Lozinke se ne poklapaju.');
    if (password.length < 6) return setError('Lozinka mora imati najmanje 6 karaktera.');

    setLoading(true);
    let firebaseUser = null;

    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      firebaseUser = credential.user;

      const token = await firebaseUser.getIdToken();
      const res = await fetch(`${DB_URL}/users/${firebaseUser.uid}.json?auth=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: 'klijent',
        }),
      });

      if (!res.ok) throw new Error('Greška pri upisu u bazu.');
    } catch (e) {
      if (firebaseUser) await firebaseUser.delete();
      setError(mapFirebaseError(e.code) || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registracija</Text>

      <TextInput
        style={styles.input}
        placeholder="Ime i prezime"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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

      <TextInput
        style={styles.input}
        placeholder="Potvrdi lozinku"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registruj se</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/login" style={styles.link}>
        Već imate nalog? Prijavite se
      </Link>
    </ScrollView>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case 'auth/email-already-in-use': return 'Korisnik sa ovim emailom već postoji.';
    case 'auth/invalid-email': return 'Neispravna email adresa.';
    case 'auth/weak-password': return 'Lozinka je preslab. Unesite najmanje 6 karaktera.';
    default: return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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