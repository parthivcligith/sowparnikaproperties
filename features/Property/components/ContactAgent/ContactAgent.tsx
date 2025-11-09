import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Select,
} from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactAgentProps {
  propertyTitle: string;
}

const ContactAgent: React.FC<ContactAgentProps> = ({ propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Please contact me regarding ${propertyTitle}`,
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const toast = useToast();

  // Get reCAPTCHA site key from environment variable
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    if (!formData.name || !formData.email) {
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
    const fullPhone = countryCode && formData.phone ? `${countryCode} ${formData.phone}` : '';
    const whatsappMessage = `*New Property Inquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      (fullPhone ? `*Phone:* ${fullPhone}\n` : '') +
      `*Message:* ${formData.message}`;

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
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `Please contact me regarding ${propertyTitle}`,
    });
    setRecaptchaValue(null);
    recaptchaRef.current?.reset();
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={6} align="stretch">
        {/* Agent Info */}
        <Box>
          <Text fontWeight="600" fontSize="lg">
            Property Agent
          </Text>
          <Text fontSize="sm" color="gray.600">
            Sowparnika Properties
          </Text>
        </Box>

        {/* Contact Form */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="500">
                Name
              </FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                size="md"
                borderRadius="md"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="500">
                Email
              </FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                size="md"
                borderRadius="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="500">
                Phone (optional)
              </FormLabel>
              <HStack>
                <Select
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  px={3}
                  py={2}
                  fontSize="sm"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  maxW="80px"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </Select>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone number"
                  size="md"
                  borderRadius="md"
                  flex={1}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="500">
                Message
              </FormLabel>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message"
                size="md"
                borderRadius="md"
                rows={4}
                resize="vertical"
              />
            </FormControl>

            <FormControl isRequired>
              <Box mt={2}>
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
              colorScheme="teal"
              size="lg"
              width="full"
              borderRadius="md"
              fontWeight="600"
              isDisabled={!recaptchaValue}
              mt={4}
            >
              Contact Agent
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactAgent;

