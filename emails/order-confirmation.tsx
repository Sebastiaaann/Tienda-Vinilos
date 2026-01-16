import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface OrderItem {
  id: string;
  productName: string;
  artist?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface ShippingAddress {
  street: string;
  number: string;
  apartment?: string;
  region: string;
  city: string;
  comuna: string;
  zipCode?: string;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
}

export const OrderConfirmationEmail = ({
  customerName = 'Cliente',
  orderNumber = 'ORD-20260112-00001',
  orderDate = '12 de Enero, 2026',
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  shippingAddress = {
    street: 'Av. Providencia',
    number: '1234',
    region: 'Región Metropolitana',
    city: 'Santiago',
    comuna: 'Providencia',
  },
}: OrderConfirmationEmailProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>Tu pedido #{orderNumber} ha sido confirmado</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Tienda de Vinilos</Heading>
          </Section>

          {/* Success Message */}
          <Section style={successSection}>
            <Heading as="h2" style={h2}>
              ¡Gracias por tu compra, {customerName}!
            </Heading>
            <Text style={text}>
              Tu pedido ha sido confirmado y está siendo procesado. Te notificaremos
              cuando tus vinilos vayan en camino.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Info */}
          <Section style={orderInfoSection}>
            <Row>
              <Column style={halfColumn}>
                <Text style={label}>NÚMERO DE ORDEN</Text>
                <Text style={value}>{orderNumber}</Text>
              </Column>
              <Column style={halfColumn}>
                <Text style={label}>FECHA</Text>
                <Text style={value}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Order Items */}
          <Section style={itemsSection}>
            <Heading as="h3" style={h3}>
              Tu Pedido
            </Heading>

            {items.map((item, index) => (
              <Row key={item.id} style={itemRow}>
                {item.imageUrl && (
                  <Column style={{ width: '80px', verticalAlign: 'top' }}>
                    <Img
                      src={item.imageUrl}
                      width="64"
                      height="64"
                      alt={item.productName}
                      style={productImage}
                    />
                  </Column>
                )}
                <Column style={{ paddingLeft: '16px', verticalAlign: 'top' }}>
                  <Text style={productName}>{item.productName}</Text>
                  {item.artist && (
                    <Text style={productArtist}>{item.artist}</Text>
                  )}
                  <Text style={productQuantity}>Cantidad: {item.quantity}</Text>
                </Column>
                <Column style={{ width: '100px', textAlign: 'right', verticalAlign: 'top' }}>
                  <Text style={productPrice}>{formatCurrency(item.price)}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Order Summary */}
          <Section style={summarySection}>
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Subtotal</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={summaryValue}>{formatCurrency(subtotal)}</Text>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Envío</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={summaryValue}>{formatCurrency(shipping)}</Text>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>IVA</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={summaryValue}>{formatCurrency(tax)}</Text>
              </Column>
            </Row>
            <Hr style={summaryDivider} />
            <Row>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={totalValue}>{formatCurrency(total)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Shipping Address */}
          <Section style={addressSection}>
            <Heading as="h3" style={h3}>
              Dirección de Envío
            </Heading>
            <Text style={addressText}>
              {shippingAddress.street} {shippingAddress.number}
              {shippingAddress.apartment && `, ${shippingAddress.apartment}`}
            </Text>
            <Text style={addressText}>
              {shippingAddress.comuna}, {shippingAddress.city}
            </Text>
            <Text style={addressText}>{shippingAddress.region}</Text>
            {shippingAddress.zipCode && (
              <Text style={addressText}>CP: {shippingAddress.zipCode}</Text>
            )}
          </Section>

          {/* CTA Button */}
          <Section style={ctaSection}>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://tiendavinilos.cl'}/orden/${orderNumber}`}
              style={button}
            >
              Ver Estado del Pedido
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              ¿Tienes preguntas sobre tu pedido?
            </Text>
            <Text style={footerText}>
              Contáctanos en{' '}
              <Link href="mailto:soporte@tiendavinilos.cl" style={footerLink}>
                soporte@tiendavinilos.cl
              </Link>
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerCopyright}>
              © 2026 Tienda de Vinilos. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f6f6f6',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const header = {
  backgroundColor: '#1a1a1a',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  letterSpacing: '-0.5px',
};

const successSection = {
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const h3 = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const divider = {
  borderColor: '#e5e7eb',
  borderTop: '1px solid #e5e7eb',
  margin: '0 24px',
};

const orderInfoSection = {
  padding: '24px 24px 16px',
};

const halfColumn = {
  width: '50%',
  verticalAlign: 'top' as const,
};

const label = {
  color: '#9ca3af',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
};

const value = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const itemsSection = {
  padding: '24px',
};

const itemRow = {
  marginBottom: '24px',
};

const productImage = {
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const productName = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const productArtist = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 4px',
};

const productQuantity = {
  color: '#9ca3af',
  fontSize: '13px',
  margin: '0',
};

const productPrice = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const summarySection = {
  padding: '24px',
};

const summaryRow = {
  marginBottom: '8px',
};

const summaryLabel = {
  color: '#4b5563',
  fontSize: '15px',
  margin: '0',
};

const summaryValueColumn = {
  textAlign: 'right' as const,
};

const summaryValue = {
  color: '#1a1a1a',
  fontSize: '15px',
  margin: '0',
};

const summaryDivider = {
  borderColor: '#e5e7eb',
  borderTop: '1px solid #e5e7eb',
  margin: '12px 0',
};

const totalLabel = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0',
};

const totalValue = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
};

const addressSection = {
  padding: '24px',
};

const addressText = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 4px',
};

const ctaSection = {
  padding: '24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  borderRadius: '8px',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
};

const footerLink = {
  color: '#1a1a1a',
  textDecoration: 'underline',
};

const footerDivider = {
  borderColor: '#e5e7eb',
  borderTop: '1px solid #e5e7eb',
  margin: '24px 0',
};

const footerCopyright = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};
