# **Prescripto**🧠🧠

Prescripto is a doctor-patient appointment management system that includes a patient-facing booking system, a doctor dashboard to manage appointments, and an admin panel to oversee doctors and appointments.

---

## **Project Structure**

### **Frontend**
The frontend serves as the patient interface where users can:
- Browse and book appointments with doctors.
- View their scheduled appointments.

### **Backend**
The backend handles:
- Data management and API services for both the frontend and admin panel.
- Secure and efficient appointment booking, cancellation, and completion handling.

### **Admin**
The admin panel provides:
- Tools to add, update, and delete doctors.
- Appointment and system data management.

---

## **Features**

### **For Patients**
- Book appointments with doctors easily.

### **For Doctors**
- View all scheduled appointments.
- Mark appointments as completed.
- Cancel appointments when necessary.

### **For Admin**
- Add and manage doctors.
- Manage appointments and related data.

---

## **Tech Stack**

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Admin Panel**: React with Tailwind CSS  
- **Other Tools**: Razorpay for payment processing, Cloudinary for image hosting

---

## **Setup**

1. Clone the repository:
2. Install dependencies for all sections:
   npm install
3. Start the backend:
   npm start
4. Start the frontend and admin panel:
   npm run dev

Environment Variables

To run this project, set up the following environment variables:

Admin Panel
	•	VITE_BACKEND_URL

Backend
	•	PORT
	•	MONGODB_URI
	•	CLOUDINARY_NAME
	•	CLOUDINARY_API_KEY
	•	CLOUDINARY_SECRET_KEY
	•	ADMIN_EMAIL
	•	ADMIN_PASSWORD
	•	JWT_SECRET
	•	RAZORPAY_KEY_ID
	•	RAZORPAY_SECRET_ID
	•	CURRENCY

Frontend
	•	VITE_BACKEND_URL
	•	VITE_RAZORPAY_KEY_ID

	Note: Ensure that the actual values for these variables are kept secure and not shared publicly.



## User API Documentation

This documentation provides an overview of the available API routes and their respective functionalities for user management, profile updates, appointment booking, and payment integration using Razorpay.

---

### **1. Register User**
- **URL:** `/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered",
    "token": "jwt_token_here"
  }
  ```

---

### **2. Login User**
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Login an existing user.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "jwt_token_here"
  }
  ```

---

### **3. Get User Profile**
- **URL:** `/get-profile`
- **Method:** `GET`
- **Description:** Retrieve the user's profile data.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Response:**
  ```json
  {
    "success": true,
    "userData": {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "address": "123 Main St",
      "date_of_birth": "1990-01-01",
      "gender": "Male"
    }
  }
  ```

---

### **4. Update Profile**
- **URL:** `/update-profile`
- **Method:** `POST`
- **Description:** Update the user's profile information.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "address":{"line1":"","line2":""},
    "date_of_birth": "1990-01-01",
    "gender": "Male"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully"
  }
  ```

---

### **5. Book Appointment**
- **URL:** `/book-appointment`
- **Method:** `POST`
- **Description:** Book an appointment with a doctor.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Request Body:**
  ```json
  {
    "docId": "doctor_id_here",
    "slotDate": "2024-01-12",
    "slotTime": "10:00 AM"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Appointment booked successfully"
  }
  ```

---

### **6. Get Appointments**
- **URL:** `/appointments`
- **Method:** `GET`
- **Description:** Retrieve all appointments of the user.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Response:**
  ```json
  {
    "success": true,
    "appointments": [
      {
        "id": "appointment_id",
        "docId": "doctor_id",
        "slotDate": "2024-01-12",
        "slotTime": "10:00 AM",
        "amount": 500
      }
    ]
  }
  ```

---

### **7. Cancel Appointment**
- **URL:** `/cancel-appointment`
- **Method:** `POST`
- **Description:** Cancel an appointment.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Request Body:**
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Appointment cancelled successfully"
  }
  ```

---

### **8. Payment via Razorpay**
- **URL:** `/payment-razorpay`
- **Method:** `POST`
- **Description:** Initiate payment for an appointment via Razorpay.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Request Body:**
  ```json
  {
    "appointmentId": "appointment_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "order": {
      "id": "order_id",
      "amount": 50000,
      "currency": "INR"
    }
  }
  ```

---

### **9. Verify Payment**
- **URL:** `/verify-payment`
- **Method:** `POST`
- **Description:** Verify payment status for an appointment via Razorpay.
- **Headers:**
  - `Authorization:  <jwt_token>`
- **Request Body:**
  ```json
  {
    "razorpay_order_id": "order_id"
  }
  ```
- **Response:** 
  - On Success:
    ```json
    {
      "success": true,
      "message": "Payment successful"
    }
    ```
  - On Failure:
    ```json
    {
      "success": false,
      "message": "Payment failed"
    }
    ```



# Doctor API Documentation

## Authentication

### Doctor Login
- **URL:** `/doctor/login`
- **Method:** `POST`
- **Description:** Logs in a doctor and returns a JWT token for subsequent requests.
- **Request Body:**
    ```json
    {
      "email": "doctor@example.com",
      "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
      "success": true,
      "token": "jwt_token_here"
    }
    ```

### Doctor Profile
- **URL:** `/doctor/profile`
- **Method:** `GET`
- **Description:** Retrieves the logged-in doctor’s profile data.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Response:**
    ```json
    {
      "success": true,
      "profileData": {
        "name": "Dr. John Doe",
        "email": "doctor@example.com",
        "fees": 500,
        "address": "123 Main St, City, Country",
        "available": true
      }
    }
    ```

---

## Appointment Management

### Get Doctor’s Appointments
- **URL:** `/doctor/doctor-appointments`
- **Method:** `GET`
- **Description:** Retrieves a list of appointments for the logged-in doctor.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Response:**
    ```json
    {
      "success": true,
      "appointments": [
        {
          "appointmentId": "appointment_id_1",
          "patientName": "John Doe",
          "time": "2025-01-15T10:00:00Z"
        },
        {
          "appointmentId": "appointment_id_2",
          "patientName": "Jane Smith",
          "time": "2025-01-15T12:00:00Z"
        }
      ]
    }
    ```

### Complete Appointment
- **URL:** `/doctor/complete-appointment`
- **Method:** `POST`
- **Description:** Marks an appointment as completed.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Request Body:**
    ```json
    {
      "appointmentId": "appointment_id_1"
    }
    ```
- **Response:**
    ```json
    {
      "success": true,
      "message": "Appointment completed"
    }
    ```

### Cancel Appointment
- **URL:** `/doctor/cancel-appointment`
- **Method:** `POST`
- **Description:** Cancels an appointment.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Request Body:**
    ```json
    {
      "appointmentId": "appointment_id_1"
    }
    ```
- **Response:**
    ```json
    {
      "success": true,
      "message": "Appointment cancelled"
    }
    ```

---

## Doctor Dashboard

### Dashboard Data
- **URL:** `/doctor/dashboard`
- **Method:** `GET`
- **Description:** Retrieves dashboard data for the logged-in doctor, including earnings, total appointments, and patient count.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Response:**
    ```json
    {
      "success": true,
      "dashboardData": {
        "earnings": 15000,
        "totalAppointments": 25,
        "patientsCount": 18
      }
    }
    ```

---

## Update Doctor Profile

### Update Doctor Profile
- **URL:** `/doctor/update-profile`
- **Method:** `POST`
- **Description:** Updates the doctor’s profile information, such as fees, address, and availability.
- **Authorization:** Requires a valid JWT token in the Authorization header.
- **Request Body:**
    ```json
    {
      "fees": 700,
      "address": "456 New Address, City, Country",
      "available": true
    }
    ```
- **Response:**
    ```json
    {
      "success": true,
      "message": "Profile updated successfully"
    }
    ```

---



Admin API Documentation

1. Admin Login
   - Route: POST /login
   - Description: Allows admin to log in using a predefined email and password.
 - **Request Body:**
 - ```json
     {
       "email": "admin_email",
       "password": "admin_password"
     }
- **Response:**
     - Success:
     - ```json
       {
         "success": true,
         "message": "Admin logged in successfully",
         "token": "JWT_TOKEN"
       }
     - Failure:
     - ```json
       {
         "success": false,
         "message": "Invalid credentials"
       }

2. Add Doctor
   - Route: POST /add-doctor
   - Description: Allows admin to add a new doctor to the system.
  - **Request Body:**
     ```json
     {
       "name": "Doctor Name",
       "email": "doctor_email",
       "password": "doctor_password",
       "speciality": "Specialization",
       "degree": "Degree",
       "experience": "Experience in years",
       "about": "About the doctor",
       "fees": "Doctor's fees",
       "address": {"line1":"City","line2":""},
       "image": "doctor_image"
     }
- **Response:**
     - Success:
     - ```json
       {
         "success": true,
         "message": "Doctor added successfully"
       }
     - Failure:
     - ```json
       {
         "success": false,
         "message": "Please fill all the fields"
       }

3. Get Doctors
   - Route: GET /get-doctors
   - Description: Retrieves the list of all doctors in the system.
   - **Response:**: JSON object with list of doctors

4. Change Doctor’s Availability
   - Route: POST /change-availability
   - Description: Allows admin to toggle a doctor’s availability.
   - **Request Body:**
   - ```json
     {
       "docId": "doctor_id"
     }
 - **Response:**
 - 
     - Success:
       ```json
       {
         "success": true,
         "message": "Availability changed"
       }
     - Failure:
       ```json
       {
         "success": false,
         "message": "Error message"
       }

5. Get All Appointments
   - Route: GET /get-appointments
   - Description: Retrieves all appointments in the system.
 - **Response:** JSON object with list of appointments

6. Cancel Appointment
   - Route: POST /cancel-appointment
   - Description: Allows admin to cancel an appointment.
- **Request Body:**
- ```json
     {
       "appointmentId": "appointment_id"
     }
- **Response:**
     - Success:
       ```json
       {
         "success": true,
         "message": "Appointment cancelled successfully"
       }
     - Failure:
       ```json
       {
         "success": false,
         "message": "Error message"
       }

7. Admin Dashboard Data
   - Route: GET /dashboard
   - Description: Retrieves the dashboard data including the number of doctors, patients, and appointments.
- **Response:** JSON object with dashboard data (number of doctors, patients, appointments)
