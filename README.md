[# MEDGUARDIAN - Full-stack Smart Medication Reminder & Health Tracker App]([url](https://medguardian.vercel.app/))

This is a full-stack **MERN** project designed to help users track their medications efficiently. It features **real-time tracking**, **one-time daily marking**, and **automated reminders** for better adherence.

## Features

- **Smart Medication Tracking**: Users can log their medications and mark them once per day.
- **Time-Restricted Entries**: Ensures accurate scheduling and prevents incorrect inputs.
- **Real-time Health Visualization**: Integrated **Chart.js** for displaying health trends.
- **Automated Email Reminders**: Sends notifications for missed doses.
- **Secure Authentication**: Ensures user data protection.
- **Responsive UI**: Built with **Tailwind CSS** for a seamless experience across devices.

## Tech Stack

- **Frontend**: React.js, Redux, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB


![Image](https://github.com/user-attachments/assets/6066f031-a0d6-4d7e-9d26-9ec7406d2f74)

![Image](https://github.com/user-attachments/assets/f864fcae-e487-479e-8369-fb3ef93368f4)

![Image](https://github.com/user-attachments/assets/d990ad93-3d8b-41f9-a946-353c1c4ae491)

![Image](https://github.com/user-attachments/assets/ecf3611b-38f9-420b-8f9c-e45caa2df0d4)

![Image](https://github.com/user-attachments/assets/3364dce7-b01a-42b1-a78a-b445d6f64a88)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/mohit1721/MedGuardian.git
cd MEDGUARDIAN
```

### Install dependencies:

#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd client
npm install
```

### Run the development server:

#### Backend
```bash
npm start
```
#### Frontend
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

## API Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/medications` - Fetch medication list
- `POST /api/medications/add` - Add a new medication
- `PUT /api/medications/:id` - Update medication details
- `DELETE /api/medications/:id` - Remove a medication

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Deploy

To deploy this project, you can use **Vercel** for the frontend and **Render/Heroku** for the backend.

- Frontend: [Vercel Deployment Guide](https://vercel.com/docs)
- Backend: [Render Deployment Guide](https://render.com/docs)

## Contributing

Contributions are welcome! Feel free to fork this repo and submit a PR with improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Developed by [Your Name](https://github.com/mohit1721) 🚀
