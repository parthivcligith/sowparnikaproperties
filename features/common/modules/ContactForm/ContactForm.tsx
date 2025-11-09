import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

type ContactFormType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm = () => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>();

  // Get reCAPTCHA site key from environment variable
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  const onSubmit = (data: ContactFormType) => {
    // Validate captcha
    if (!recaptchaValue) {
      toast({
        title: 'Verification required',
        description: 'Please complete the reCAPTCHA verification.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Format message for WhatsApp
    const whatsappMessage = `*New Contact Form Inquiry*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      (data.phone ? `*Phone:* ${data.phone}\n` : '') +
      `*Message:* ${data.message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919446211417?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Opening WhatsApp to send your message...',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    reset();
    setRecaptchaValue(null);
    recaptchaRef.current?.reset();
  };

  return (
    <Box
      width="100%"
      borderRadius="sm"
      backgroundColor="white"
      color="gray.700"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            marginTop="1.3rem"
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="phone"
            type="email"
            placeholder="Phone"
            {...register('phone', { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="email"
            type="text"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          <Textarea
            marginTop="1.3rem"
            id="message"
            placeholder="Message"
            {...register('message', { required: true })}
          />
          <FormControl isRequired marginTop="1.3rem">
            <Box>
              {recaptchaSiteKey ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(value) => setRecaptchaValue(value)}
                  onExpired={() => setRecaptchaValue(null)}
                  onError={() => setRecaptchaValue(null)}
                />
              ) : (
                <Text fontSize="sm" color="red.500">
                  reCAPTCHA site key not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.
                </Text>
              )}
            </Box>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            display="flex"
            fontSize="base"
            padding="1.6rem"
            marginTop="4rem"
            marginLeft="auto"
            isDisabled={!recaptchaValue}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ContactForm;
