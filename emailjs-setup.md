# EmailJS Setup Instructions

To enable the contact form functionality, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{user_name}}

From: {{user_name}} <{{user_email}}>
Organization: {{organization}}
Phone: {{phone}}

Message:
{{message}}

---
This message was sent from the FallGuard Pro website contact form.
```

4. Save the template and note down the **Template ID**

## 4. Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

## 5. Update the Code
Open `script.js` and replace these placeholders with your actual values:

```javascript
// Replace these with your actual EmailJS credentials:
emailjs.init("YOUR_PUBLIC_KEY");        // Your Public Key
'YOUR_SERVICE_ID'                       // Your Service ID  
'YOUR_TEMPLATE_ID'                      // Your Template ID
```

## 6. Test the Contact Form
1. Open your website
2. Fill out the contact form
3. Submit and check if you receive the email

## Example Configuration
```javascript
// Initialize EmailJS
emailjs.init("user_abc123def456");

// Send email
emailjs.sendForm('service_gmail123', 'template_contact456', form)
```

## Troubleshooting
- Make sure all IDs are correctly copied from your EmailJS dashboard
- Check browser console for any error messages
- Verify your email service is properly connected
- Test with a simple message first

## Free Plan Limits
- 200 emails per month
- EmailJS branding included
- Upgrade to remove limits and branding
