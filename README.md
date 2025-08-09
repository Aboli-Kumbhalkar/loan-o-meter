# 💰 Loan-o-Meter | EMI Calculator

**See Your Payments Before They See You!**

A modern, responsive EMI (Equated Monthly Installment) calculator built with Next.js 15, featuring a sleek glassmorphism design and support for multiple loan types.

![Loan-o-Meter Preview](https://via.placeholder.com/800x600/000000/FFFFFF?text=Loan-o-Meter+Preview)

## ✨ Features

- 🏦 **Multiple Loan Types**: Personal, Vehicle, Home, and Business loans
- 🎪 **Interactive Carousel**: Swipeable loan type selection with peek preview
- 💰 **Real-time Calculations**: Instant EMI calculations as you adjust values
- 📱 **Responsive Design**: Works perfectly on mobile and desktop
- 🎨 **Modern UI**: Glassmorphism design with animated gradient backgrounds
- 🔐 **Authentication**: Simple login system (demo: admin/admin)
- 💾 **State Management**: Preserves loan data when switching between types
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized fonts

## 🚀 Live Demo

🌐 **[View Live Demo](https://your-app-name.vercel.app)** *(Coming soon)*

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Poppins (Google Fonts)
- **Deployment**: Vercel

## 📋 Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for compatibility)

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loan-o-meter.git
   cd loan-o-meter
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run the development server**
   ```bash
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

**Demo Credentials:**
- **Username**: `admin`
- **Password**: `admin`

## 💡 How to Use

1. **Login** with the demo credentials
2. **Select a loan type** using the carousel (Personal, Vehicle, Home, Business)
3. **Adjust the parameters**:
   - Annual Income
   - Loan Amount
   - Down Payment
   - Tenure (months)
   - Interest Rate
4. **View real-time calculations**:
   - Monthly EMI
   - Total Amount Payable
   - Total Interest
5. **Switch between loan types** - your data is preserved for each type!

## 🎨 Features Deep Dive

### Loan Types Supported
- **Personal Loans**: 2-5 years, higher interest rates
- **Vehicle Loans**: 1-10 years, moderate interest rates  
- **Home Loans**: 5-30 years, lower interest rates
- **Business Loans**: 1-10 years, variable interest rates

### Smart Defaults
Each loan type comes with realistic default values:
- Different tenure ranges
- Appropriate interest rate ranges
- Suitable loan amount limits

### Responsive Design
- Mobile-first approach
- Touch-friendly controls
- Smooth animations and transitions

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done)
2. **Visit [Vercel](https://vercel.com)**
3. **Import your GitHub repository**
4. **Deploy with zero configuration**

### Deploy to Netlify

1. **Build the project**
   ```bash
   bun run build
   ```
2. **Deploy the `out` folder to Netlify**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern fintech applications
- Glassmorphism UI trend
- Next.js team for the amazing framework
- Bun team for the fast runtime

---

**Made with ❤️ for better financial planning**

*Calculate smart, borrow smarter!* 💪