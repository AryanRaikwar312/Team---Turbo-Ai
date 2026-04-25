# Absolute Beginner's Guide: Building Your First n8n Backend

If you have never used n8n or built a backend before, don't worry! n8n is a visual drag-and-drop tool. Think of it like connecting LEGO blocks where data flows from one block to the next.

We will build a simple, working backend for the **Mentor Booking System** using **Airtable** (a free visual database) and **Gmail** (to send confirmation emails).

---

## Step 1: Account Setup (The Prerequisites)

Before touching n8n, we need places to store data and send emails.

1. **Create an Airtable Account**: Go to airtable.com and sign up for free.
   - Create a new "Base" (spreadsheet). Name it "SYRAXO Database".
   - Rename "Table 1" to "Bookings".
   - Create the following columns (fields): `Student Name` (Single line text), `Student Email` (Email), `Mentor Name` (Single line text), `Date` (Date), `Time` (Single line text).
2. **Create an n8n Account**: Go to n8n.io and sign up for "n8n Cloud" (or install it locally for free if you prefer).
   - Once logged in, click **"Add Workflow"**. Name it "Mentor Booking Flow".

---

## Step 2: Create the Webhook (The Listener)

A Webhook is like a mailbox. It waits for your React website to drop a letter (data) into it.

1. In your blank n8n workflow, click the **"+"** button to add a node.
2. Search for **Webhook** and click it.
3. A panel will open. Set the following:
   - **HTTP Method**: Change from `GET` to `POST`.
   - **Path**: Type `mentor-booking`.
   - **Respond**: Change to `Immediately`.
4. At the top of the Webhook panel, you will see a **"Test URL"** and a **"Production URL"**. Copy the **Test URL**.
5. Close the panel.

> [!TIP]
> The Webhook node is now waiting for test data. We need to send it fake data from our computer to help it understand what the data looks like.

---

## Step 3: Send Test Data from your Computer

We need to trigger the webhook so n8n knows what data to expect.

1. In n8n, click the green **"Listen for Test Event"** button on the Webhook node. It will start spinning.
2. Open your terminal/command prompt on your computer and paste this exact code (make sure to replace `YOUR_TEST_URL_HERE` with the URL you copied in Step 2):

```bash
curl -X POST "YOUR_TEST_URL_HERE" \
     -H "Content-Type: application/json" \
     -d '{"studentName":"John Doe", "studentEmail":"john@test.com", "mentorName":"Aryan Sharma", "date":"2026-05-10", "time":"10:00 AM"}'
```
3. Press Enter. 
4. Go back to n8n. The Webhook node should now show a green checkmark! Click on it, and you will see the data (`John Doe`, `Aryan Sharma`) successfully received.

---

## Step 4: Connect Airtable (The Database)

Now we want to take that data and save it in our Airtable spreadsheet.

1. Click the small **"+"** button attached to the right side of your Webhook node.
2. Search for **Airtable** and select it.
3. **Connect your Account**: 
   - Click "Credential to connect with" -> "Create New Credential".
   - Follow the instructions to get your Airtable Personal Access Token and paste it in.
4. Set up the Node:
   - **Operation**: Select `Create`.
   - **Base**: Select your "SYRAXO Database".
   - **Table**: Select "Bookings".
5. **Map the Data**:
   - Under "Columns", click "Add Field". 
   - In the "Column Name", select `Student Name`. 
   - For "Value", you want to grab the data from the Webhook. Click the little gear icon or drag the `studentName` variable from the left panel (input data) into this box.
   - Repeat this for `Student Email`, `Mentor Name`, `Date`, and `Time`.
6. Click **"Execute Node"**. If you check your Airtable account, a new row with John Doe's data should magically appear!

---

## Step 5: Send a Confirmation Email

Let's send an email to the student confirming the booking.

1. Click the **"+"** button attached to the right side of your Airtable node.
2. Search for **Gmail** and select it.
3. **Connect your Account**: 
   - Create a new credential and sign in with Google. (You may need to enable "App Passwords" in your Google account if using standard SMTP, but n8n makes the Gmail API connection easy via OAuth).
4. Set up the Node:
   - **Resource**: `Message`
   - **Operation**: `Send`
   - **To**: Drag the `studentEmail` variable from the left panel (the data passed down from the webhook) into this box.
   - **Subject**: Type `Booking Confirmed with ` and then drag the `mentorName` variable next to it.
   - **Message**: Type your email body: `"Hi! Your session with [Drag Mentor Name] on [Drag Date] at [Drag Time] is confirmed."`
5. Click **"Execute Node"**. Check your email (john@test.com if you used your real email in the curl command) to see the confirmation!

---

## Step 6: Go Live!

1. In n8n, change the toggle at the top right from **"Inactive"** to **"Active"**.
2. Open your Webhook node and copy the **Production URL** (not the Test URL).
3. Now, you paste this Production URL into your React code (`MentorGuidance.tsx`), replacing the mock function with a real `fetch` request:

```tsx
const handleConfirmBooking = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Gather the data from your React state
  const payload = {
    studentName: "Real User", // Replace with auth state later
    studentEmail: "user@email.com", // Replace with auth state later
    mentorName: selectedMentor.name,
    date: bookingDate,
    time: bookingTime
  };

  // 2. Send it to n8n!
  try {
    await fetch("PASTE_YOUR_PRODUCTION_URL_HERE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    // Move to success screen
    setBookingStep("success");
    
  } catch (error) {
    console.error("Booking failed:", error);
  }
};
```

**Congratulations!** You have just built a complete backend workflow. When someone clicks "Book Call" on your website, it will automatically save to your database and send them an email!
