<?php
// submit_booking.php

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $people = filter_input(INPUT_POST, 'people', FILTER_SANITIZE_NUMBER_INT);
    $notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_STRING);

    // Validate required fields
    if (empty($name) || empty($phone) || empty($people)) {
        // Redirect back with an error message
        header("Location: book.html?error=Please+fill+in+all+required+fields.");
        exit();
    }

    // Further validation (e.g., phone number format)
    if (!preg_match("/^\(\d{3}\) \d{3}-\d{4}$/", $phone)) {
        header("Location: book.html?error=Invalid+phone+number+format.");
        exit();
    }

    // Prepare the email
    $to = "simon.g.chalifour@gmail.com";
    $subject = "New Table Booking from $name";
    $message = "You have received a new table booking:\n\n" .
               "Name: $name\n" .
               "Phone Number: $phone\n" .
               "Number of People: $people\n" .
               "Notes: $notes\n\n" .
               "Thank you!";
    $headers = "From: no-reply@sushiyamatcha.com\r\n" .
               "Reply-To: $phone\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to a thank you page
        header("Location: thank-you.html");
        exit();
    } else {
        // Redirect back with an error message
        header("Location: book.html?error=There+was+an+error+sending+your+booking.");
        exit();
    }
} else {
    // If not a POST request, redirect back to the booking form
    header("Location: book.html");
    exit();
}
?>
