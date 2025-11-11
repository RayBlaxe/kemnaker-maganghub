export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>
          &copy; 2025 Kemnaker - Data dari{' '}
          <a
            href="https://maganghub.kemnaker.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 underline"
          >
            Magang Hub
          </a>
        </p>
      </div>
    </footer>
  );
}
