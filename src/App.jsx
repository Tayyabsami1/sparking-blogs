
import './App.css'
function App() {

  const client = new Client();

  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  return (
    <>
      <h1>Hello {import.meta.env.VITE_MyEnv}</h1>
    </>
  )
}

export default App
