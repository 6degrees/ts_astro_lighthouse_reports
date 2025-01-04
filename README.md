# Mother of all Lighthouse Reports 🚦

An automated Lighthouse reporting system that generates and displays performance metrics for multiple websites. Reports are automatically generated every 2 days at 00:00 UTC using GitHub Actions.

## 🚀 Features

- Automated Lighthouse audits for multiple websites
- Visual performance metrics using radial charts
- Historical report storage
- Mobile and desktop-friendly interface
- Screenshot previews of audited websites
- Detailed performance, accessibility, best practices, and SEO scores

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ApexCharts](https://apexcharts.com/) - Data Visualization
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance Auditing
- [GitHub Actions](https://github.com/features/actions) - Automation

## 🤖 GitHub Actions

The repository is configured with GitHub Actions to:

- Run Lighthouse tests automatically every 2 days at 00:00 UTC
- Generate and deploy updated reports
- Store historical data for each website

## 🔍 Viewing Reports

- Live reports are available at `/reports/[domain]/live/report.html`
- Historical reports are stored at `/reports/[domain]/[date]/report.html`
- The main dashboard shows an overview of all website performances

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Created by

[6 Degrees Technologies](https://6degrees.com.sa/) - Making the web faster, one report at a time.