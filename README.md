# Kemnaker Next.js - Job Vacancy Portal

A modern Next.js application for browsing and analyzing Indonesian internship vacancies from Magang Hub Kemnaker.

## ✨ Features

- 🔍 **Advanced Filtering** - Province, sorting, and opportunity ratio filters
- 🎯 **Opportunity Filter** - Find positions with 50%+ availability (best chances)
- 📊 **Analytics Dashboard** - Comprehensive statistics and visualizations
- 🎨 **Modern UI** - Built with Tailwind CSS and responsive design
- ⚡ **Fast Performance** - Next.js 15 with App Router
- 🔒 **Type Safe** - Full TypeScript support
- 📱 **Mobile Friendly** - Responsive across all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd kemnaker-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
kemnaker-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Navigation
│   │   ├── page.tsx                # Home page (vacancy listings)
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard analytics page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── Navigation.tsx          # Header navigation
│   │   ├── Footer.tsx              # Footer component
│   │   ├── VacancyCard.tsx         # Vacancy display card
│   │   ├── FilterPanel.tsx         # Advanced filters
│   │   ├── Pagination.tsx          # Page navigation
│   │   └── dashboard/
│   │       ├── DashboardFilters.tsx  # Dashboard filter controls
│   │       ├── DashboardMetrics.tsx  # Key metrics cards
│   │       ├── DashboardCharts.tsx   # Visual charts
│   │       └── DashboardTables.tsx   # Data tables
│   ├── lib/
│   │   ├── api.ts                  # API integration
│   │   ├── statistics.ts           # Statistics calculations
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 Key Features Explained

### 1. Opportunity Ratio Filter

Calculate and filter vacancies by availability percentage:

- **≥90% Tersedia** - Very high opportunity (almost guaranteed)
- **≥75% Tersedia** - High opportunity
- **≥50% Tersedia** - Moderate opportunity (50/50 chance) ⭐ Recommended
- **≥25% Tersedia** - Low opportunity (competitive)
- **All Available** - Any position with open spots
- **Full** - Filled positions

**Formula:** `(Available Spots ÷ Total Quota) × 100%`

### 2. Advanced Filtering

- **Province Filter** - Filter by Indonesian province
- **Sort Options** - By quota, registered count, or date
- **Direction** - Ascending or descending
- **Items Per Page** - 20, 50, or 100 results
- **Search** - Real-time search across positions and companies

### 3. Dashboard Analytics

- **4 Key Metrics** - Total vacancies, quota, registered, available
- **Visual Charts** - Province distribution, position rankings
- **Detailed Tables** - Province, position, and company breakdowns
- **Custom Analysis** - Filter by province, adjustable data amount

## 📊 API Integration

**Endpoint:** `https://maganghub.kemnaker.go.id/be/v1/api/list/vacancies-aktif`

**Supported Parameters:**
- `page` - Page number
- `limit` - Results per page (20, 50, 100)
- `kode_provinsi` - Province code filter
- `order_by` - Sort field (jumlah_kuota, jumlah_terdaftar, created_at)
- `order_direction` - ASC or DESC

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Image Optimization:** Next.js Image Component
- **State Management:** React Hooks
- **Data Fetching:** Fetch API

## 📱 Pages

### Home Page (/)
- Browse all active vacancies
- Apply filters and search
- View opportunity indicators
- Paginate through results

### Dashboard (/dashboard)
- View comprehensive statistics
- Analyze by province
- Visual charts and graphs
- Detailed data tables

## 🎨 Design Features

- **Gradient Backgrounds** - Custom primary/secondary gradients
- **Opportunity Bars** - Visual progress indicators
- **Color-Coded Badges** - Quick status identification
- **Hover Effects** - Interactive card animations
- **Responsive Grid** - Adapts to screen size
- **Loading States** - Smooth loading indicators

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build for production:
```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Tailwind Colors

Custom colors defined in `tailwind.config.ts`:
- `primary` - Purple gradient (667eea - 764ba2)
- `secondary` - Purple shades

### Next.js Config

Image domains configured for:
- maganghub.kemnaker.go.id
- via.placeholder.com

## 📚 Type Definitions

All types defined in `src/types/index.ts`:
- `Vacancy` - Vacancy data structure
- `VacancyFilters` - Filter options
- `DashboardStats` - Statistics data
- `PaginationMeta` - Pagination info
- And more...

## 💡 Usage Examples

### Finding Best Opportunities

1. Go to home page
2. Set **Peluang: ≥50% Tersedia**
3. Set **Province:** Your preferred location
4. Click **Terapkan Filter**
5. View positions with best chances!

### Analyzing Specific Province

1. Go to Dashboard
2. Select province from filter
3. Choose data amount (10 pages recommended)
4. View province-specific statistics

## 🤝 Contributing

This is a conversion of the original HTML/CSS/JS project to Next.js with enhanced features.

## 📄 License

Data provided by Magang Hub Kemnaker.

## 🆘 Support

For issues or questions:
1. Check the original HTML version
2. Review API documentation
3. Check Next.js documentation

## ✅ Completed Features

- [x] Next.js 15 setup
- [x] TypeScript configuration
- [x] Tailwind CSS styling
- [x] Responsive design
- [x] API integration
- [x] Opportunity filter
- [x] Advanced filtering
- [x] Dashboard analytics
- [x] Visual charts
- [x] Data tables
- [x] Search functionality
- [x] Pagination
- [x] Loading states
- [x] Error handling

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
