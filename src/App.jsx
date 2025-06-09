import Activity from './components/Activity';

const testData = [];
const today = new Date();
for (let i = 0; i < 200; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() - Math.floor(Math.random() * 365));
  testData.push(d.toISOString());
}

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Activity Graph</h1>
      <Activity data={testData} />
    </div>
  );
}

export default App;
