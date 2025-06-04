# Skip Selector Component

A modern, responsive React component for selecting skip sizes with a beautiful dark/light theme toggle. Built with React, TypeScript and styled using Tailwind CSS.

### 🔗 Live Site
👉 https://rem-waste-iota.vercel.app/


## 🌟 Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Theme Toggle**: Beautiful dark/light mode with smooth transitions
- **Interactive Progress Bar**: Visual step-by-step progress indicator
- **Dynamic Skip Cards**: Animated selection cards with hover effects
- **Real-time Pricing**: Automatic VAT calculations and total price display
- **Sticky Footer**: Confirmation bar that appears when a skip is selected
- **Loading States**: Elegant loading animation while data fetches
- **Accessibility**: WCAG compliant color contrasts and semantic markup

## 🚀 Demo

The component displays available skip sizes (4-40 yards) with pricing, hire periods, and availability information. Users can select a skip size and proceed to the next step in the booking process.

## 📦 Installation
1.  Clone the repository:
   ```bash
   git clone https://github.com/stine-ri/REMWaste



This component requires the following dependencies:

```bash
pnpm install react lucide-react
# or
yarn add react lucide-react
```

## 🛠️ Technologies Used

- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **CSS Transitions** for smooth animations

## 📁 Component Structure

```
RemWaste/
├── Components/
│   └── ChooseYourSkipSize

```

## 🎯 Core Functionality

### 1. ChooseYourSkipSize Data Management

```typescript
interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
```

### 2. State Management

The component manages several pieces of state:

- `skips`: Array of available skip options
- `selectedSkip`: Currently selected skip ID
- `loading`: Loading state for data fetching
- `isDark`: Theme toggle state

### 3. Progress Tracking

```typescript
const steps = [
  { name: 'Postcode', completed: true },
  { name: 'Waste Type', completed: true },
  { name: 'Select Skip', completed: false, current: true },
  { name: 'Permit Check', completed: false },
  { name: 'Choose Date', completed: false },
  { name: 'Payment', completed: false }
];
```

## 🎨 Styling Architecture

### Theme System

The component uses a comprehensive theme system with smooth transitions:

#### Light Theme Colors:
- **Background**: Blue-50 to Purple-50 gradient
- **Cards**: White with subtle transparency
- **Text**: Gray-700 for primary, Gray-600 for secondary
- **Accents**: Indigo-600 to Purple-600 gradients
- **Borders**: Gray-200 for subtle definition

#### Dark Theme Colors:
- **Background**: Gray-900 to Slate-900 gradient
- **Cards**: Gray-800 with backdrop blur
- **Text**: White/Gray-300 for optimal readability
- **Accents**: Blue-400 to Purple-400 gradients
- **Borders**: Gray-700 for subtle definition

### Responsive Design

The component uses Tailwind's responsive utilities:

```css
/* Mobile-first approach */
.grid-cols-1          /* Mobile: 1 column */
.md:grid-cols-2       /* Tablet: 2 columns */
.lg:grid-cols-3       /* Desktop: 3 columns */
```

## 🔧 Key Functions

### `calculateTotalPrice(skip: Skip): number`
Calculates the total price including VAT:
```typescript
return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
```

### `handleSkipSelection(skipId: number)`
Handles skip selection with toggle functionality:
```typescript
setSelectedSkip(selectedSkip === skipId ? null : skipId);
```

### `toggleTheme()`
Switches between light and dark themes:
```typescript
setIsDark(!isDark);
```

## 🎭 Animation System

### Transition Classes
- **Duration**: `duration-300` for quick interactions, `duration-500` for theme changes
- **Hover Effects**: `hover:scale-105` for cards, `hover:shadow-2xl` for depth
- **Loading**: Custom spin animation for loading state

### Interactive States
- **Card Hover**: Scale up with shadow enhancement
- **Button Hover**: Gradient color shifts
- **Selection**: Ring effect with color change
- **Theme Toggle**: Smooth color transitions

## 📱 Component Sections

### 1. Header Progress Bar
- **Sticky positioning** at the top
- **Visual progress indicators** with checkmarks
- **Theme toggle button** in the top-right
- **Backdrop blur** for modern glass effect

### 2. Skip Selection Grid
- **Responsive grid layout** (1-3 columns)
- **Interactive cards** with hover animations
- **Skip visualization** with custom SVG illustrations
- **Feature badges** for road permits and heavy waste

### 3. Selection Footer
- **Sticky bottom positioning** (only visible when skip selected)
- **Disclaimer text** for legal compliance
- **Selection summary** with pricing
- **Navigation buttons** (Back/Continue)

## 🎨 Visual Elements

### Skip Bin SVG
Custom SVG illustration for each skip:
```svg
<svg width="120" height="80" viewBox="0 0 120 80">
  <!-- Skip bin main body -->
  <rect x="20" y="25" width="80" height="45" fill="#FFA500"/>
  <!-- Additional visual elements -->
</svg>
```

### Loading Animation
Custom spinning loader:
```css
.animate-spin {
  animation: spin 1s linear infinite;
}
```

## 🔧 Customization Options

### Theme Colors
Modify the theme colors by updating the Tailwind classes:

```typescript
// Light theme
'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'

// Dark theme  
'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
```

### Skip Data
Replace the `mockData` array with your API endpoint:

```typescript
useEffect(() => {
  const fetchSkips = async () => {
    const response = await fetch('/api/skips');
    const data = await response.json();
    setSkips(data);
    setLoading(false);
  };
  
  fetchSkips();
}, []);
```

### Pricing Logic
Modify the `calculateTotalPrice` function for different pricing models:

```typescript
const calculateTotalPrice = (skip: Skip): number => {
  // Add custom pricing logic here
  const basePrice = skip.price_before_vat;
  const vatAmount = basePrice * (skip.vat / 100);
  const transportCost = skip.transport_cost || 0;
  
  return Math.round(basePrice + vatAmount + transportCost);
};
```

## 📊 Performance Optimizations

### 1. Lazy Loading
The component simulates API loading with a timeout:
```typescript
setTimeout(() => {
  setSkips(mockData);
  setLoading(false);
}, 800);
```

### 2. Efficient Re-renders
Uses React.memo patterns and optimized state updates to minimize re-renders.

### 3. CSS Transitions
Hardware-accelerated CSS transitions for smooth animations without JavaScript overhead.

## 🎯 Usage Examples

### Basic Implementation
```tsx
import SkipSelector from './components/SkipSelector';

function App() {
  return (
    <div className="App">
      <SkipSelector />
    </div>
  );
}
```

### With Custom Props
```tsx
interface SkipSelectorProps {
  onSkipSelected?: (skip: Skip) => void;
  initialTheme?: 'light' | 'dark';
  postcode?: string;
}

const SkipSelector: React.FC<SkipSelectorProps> = ({
  onSkipSelected,
  initialTheme = 'light',
  postcode
}) => {
  // Component implementation
};
```

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📋 Accessibility Features

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Proper heading hierarchy

### Keyboard Navigation
- Tab order follows visual flow
- Enter/Space key support for selections
- Focus indicators for all interactive elements

### Color Contrast
- WCAG AA compliant contrast ratios
- Theme-appropriate color combinations
- Clear visual hierarchy

## 🐛 Common Issues & Solutions

### 1. Icons Not Displaying
```bash
npm install lucide-react
```

### 2. Tailwind Classes Not Working

Tailwind CSS Setup (Vite Plugin Method)
💡 Ensure Tailwind CSS is correctly set up in your Vite project. [Follow Tailwind's Vite guide](https://tailwindcss.com/docs/guides/vite).


### 3. Smooth Transitions Not Working
Check CSS transition classes are applied:
```css
.transition-all.duration-300
```

## 🔮 Future Enhancements

### Potential Features
- **Animation library integration** (Framer Motion)
- **Advanced filtering** (price range, features)
- **Comparison mode** (select multiple skips)
- **Favorites system** (save preferred skips)
- **Real-time availability** (WebSocket integration)

### Performance Improvements
- **Virtual scrolling** for large datasets
- **Image optimization** for skip illustrations
- **Service worker** for offline functionality

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icon set
- **React Team** for the amazing framework
- **TypeScript** for type safety and developer experience

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*