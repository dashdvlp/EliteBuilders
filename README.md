# EliteBuilders AI Competition Platform

A modern web platform for AI coding competitions, built with React, TypeScript, and Material-UI.

## Features

- OAuth authentication with GitHub and Google
- Profile management with GitHub integration
- Portfolio and CV upload capabilities
- AI coding challenges
- Real-time leaderboard
- User profiles and achievements

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Material-UI
  - Vite
  - React Router

- **Development Tools:**
  - Python-based development server
  - File watching and auto-rebuilding
  - OAuth integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.7+
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/elitebuilders.git
   cd elitebuilders
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install watchdog
   ```

4. Create environment variables:
   ```bash
   # Create .env in frontend directory
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
   ```

### Development

1. Start the development server:
   ```bash
   python watch_and_build.py
   ```

2. Open [http://localhost:5173](http://localhost:5173) in your browser

The development server will:
- Watch for file changes
- Automatically rebuild when changes are detected
- Serve the application

### Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. The built files will be in `frontend/dist`

## Project Structure

```
elitebuilders/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   ├── styles/
│   │   └── config/
│   ├── public/
│   └── package.json
├── watch_and_build.py
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 