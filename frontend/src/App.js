import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.text())
      .then(data => setMensaje(data))
      .catch(err => {
        console.error('Error:', err);
        setMensaje('Error al conectar con el backend');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{mensaje || 'Cargando...'}</h1>
      </header>
    </div>
  );
}

export default App;