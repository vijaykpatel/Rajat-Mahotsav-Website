import ScrollColorTransition from '@/components/scroll-transition/ScrollColorTransition';
import './App.css';

export default function ScrollDemo() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ScrollColorTransition />
      <section className="main-content-section">
        <h2>Text Section 2</h2>
        <p>This section maintains the gradient background from the transition.</p>
      </section>
    </div>
  );
}
