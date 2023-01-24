export default function WhatsAppMessageSend(phoneNumber, message) {
    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        '_blank'
    );
};

