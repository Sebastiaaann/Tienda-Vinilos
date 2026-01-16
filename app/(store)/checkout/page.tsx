"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Check, 
  ChevronRight, 
  CreditCard, 
  Truck, 
  User, 
  MapPin, 
  ShoppingBag,
  ArrowLeft,
  Loader2,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/stores";
import { cn, formatPrice } from "@/lib/utils";

// --- Schemas ---

const customerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  firstName: z.string().min(2, { message: "Nombre requerido" }),
  lastName: z.string().min(2, { message: "Apellido requerido" }),
  phone: z.string().min(8, { message: "Teléfono requerido" }),
  createAccount: z.boolean().optional(),
});

const shippingSchema = z.object({
  street: z.string().min(3, { message: "Calle requerida" }),
  number: z.string().min(1, { message: "Número requerido" }),
  apartment: z.string().optional(),
  region: z.string().min(1, { message: "Región requerida" }),
  city: z.string().min(1, { message: "Ciudad requerida" }),
  comuna: z.string().min(1, { message: "Comuna requerida" }),
  zipCode: z.string().optional(),
});

const paymentSchema = z.object({
  method: z.enum(["webpay", "mercadopago", "flow", "transfer"]),
});

type CustomerFormValues = z.infer<typeof customerSchema>;
type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

// --- Components ---

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                  : isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground bg-background"
              )}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-bold">{stepNumber}</span>}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={cn(
                  "w-12 h-1 mx-2 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalItems, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Form States
  const [customerData, setCustomerData] = useState<CustomerFormValues | null>(null);
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormValues | null>(null);

  // Hydration check
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Redirect if cart is empty
    if (items.length === 0) {
      // Allow a brief moment for hydration before redirecting, or handle in render
      // router.push("/carrito"); 
      // Commented out to prevent flash if items load from local storage
    }
  }, [items, router]);

  // Forms Hooks
  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerData || {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      createAccount: false,
    },
  });

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingData || {
      street: "",
      number: "",
      apartment: "",
      region: "",
      city: "",
      comuna: "",
      zipCode: "",
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentData || {
      method: undefined,
    },
  });

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 50000 ? 0 : 5000;
  const total = subtotal + shippingCost;

  // Handlers
  const handleCustomerSubmit = (data: CustomerFormValues) => {
    setCustomerData(data);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleShippingSubmit = (data: ShippingFormValues) => {
    setShippingData(data);
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (data: PaymentFormValues) => {
    setPaymentData(data);
    setCurrentStep(4);
    window.scrollTo(0, 0);
  };

  const handleFinalOrder = async () => {
    if (!customerData || !shippingData || !paymentData) return;

    setIsProcessing(true);
    setOrderError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customerData,
          shipping: shippingData,
          payment: paymentData,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: total,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al procesar la orden");
      }

      clearCart();
      toast.success('¡Orden creada exitosamente!', {
        description: `Tu pedido #${result.orderId} ha sido confirmado`
      });
      router.push(`/orden/${result.orderId}`);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      setOrderError(errorMessage);
      toast.error('Error al procesar la orden', {
        description: errorMessage
      });
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Button onClick={() => router.push("/catalogo")}>Volver al Catálogo</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
        
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Customer Info */}
            {currentStep === 1 && (
              <Card className="animate-in slide-in-from-left duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>Ingresa tus datos para el envío del comprobante</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="customer-form" onSubmit={customerForm.handleSubmit(handleCustomerSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nombre</label>
                        <Input {...customerForm.register("firstName")} placeholder="Juan" />
                        {customerForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">{customerForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Apellido</label>
                        <Input {...customerForm.register("lastName")} placeholder="Pérez" />
                        {customerForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">{customerForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input {...customerForm.register("email")} placeholder="juan@ejemplo.com" type="email" />
                      {customerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{customerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Teléfono</label>
                      <Input {...customerForm.register("phone")} placeholder="+56 9 1234 5678" />
                      {customerForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">{customerForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="createAccount"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        {...customerForm.register("createAccount")}
                      />
                      <label htmlFor="createAccount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Crear una cuenta para futuras compras
                      </label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push("/carrito")}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Volver
                  </Button>
                  <Button type="submit" form="customer-form">
                    Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <Card className="animate-in slide-in-from-right duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Dirección de Envío
                  </CardTitle>
                  <CardDescription>¿Dónde quieres recibir tus vinilos?</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="shipping-form" onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Calle</label>
                        <Input {...shippingForm.register("street")} placeholder="Av. Providencia" />
                        {shippingForm.formState.errors.street && (
                          <p className="text-sm text-destructive">{shippingForm.formState.errors.street.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Número</label>
                        <Input {...shippingForm.register("number")} placeholder="1234" />
                        {shippingForm.formState.errors.number && (
                          <p className="text-sm text-destructive">{shippingForm.formState.errors.number.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Depto / Oficina (Opcional)</label>
                        <Input {...shippingForm.register("apartment")} placeholder="Depto 402" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Comuna</label>
                        <Input {...shippingForm.register("comuna")} placeholder="Providencia" />
                        {shippingForm.formState.errors.comuna && (
                          <p className="text-sm text-destructive">{shippingForm.formState.errors.comuna.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ciudad</label>
                        <Input {...shippingForm.register("city")} placeholder="Santiago" />
                        {shippingForm.formState.errors.city && (
                          <p className="text-sm text-destructive">{shippingForm.formState.errors.city.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Región</label>
                        <Input {...shippingForm.register("region")} placeholder="Metropolitana" />
                        {shippingForm.formState.errors.region && (
                          <p className="text-sm text-destructive">{shippingForm.formState.errors.region.message}</p>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
                  </Button>
                  <Button type="submit" form="shipping-form">
                    Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <Card className="animate-in slide-in-from-right duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Método de Pago
                  </CardTitle>
                  <CardDescription>Selecciona cómo quieres pagar. (Modo Simulación)</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="payment-form" onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                    <div className="grid gap-4">
                      <div className="relative">
                        <input
                          type="radio"
                          id="webpay"
                          value="webpay"
                          className="peer sr-only"
                          {...paymentForm.register("method")}
                        />
                        <label
                          htmlFor="webpay"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <CreditCard className="w-6 h-6" />
                            <div className="space-y-1">
                              <p className="font-medium leading-none">Webpay Plus</p>
                              <p className="text-sm text-muted-foreground">Débito y Crédito</p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          id="mercadopago"
                          value="mercadopago"
                          className="peer sr-only"
                          {...paymentForm.register("method")}
                        />
                        <label
                          htmlFor="mercadopago"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <CreditCard className="w-6 h-6" />
                            <div className="space-y-1">
                              <p className="font-medium leading-none">Mercado Pago</p>
                              <p className="text-sm text-muted-foreground">Tarjetas y saldo en cuenta</p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          id="transfer"
                          value="transfer"
                          className="peer sr-only"
                          {...paymentForm.register("method")}
                        />
                        <label
                          htmlFor="transfer"
                          className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <ShoppingBag className="w-6 h-6" />
                            <div className="space-y-1">
                              <p className="font-medium leading-none">Transferencia Bancaria</p>
                              <p className="text-sm text-muted-foreground">Datos se enviarán al correo</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    {paymentForm.formState.errors.method && (
                      <p className="text-sm text-destructive mt-2">{paymentForm.formState.errors.method.message}</p>
                    )}
                    
                    <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-4 rounded-lg text-sm flex items-start gap-3 border border-yellow-500/20">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>
                        Este es un sistema de demostración. No se realizarán cargos reales a tu tarjeta ni transacciones bancarias verdaderas.
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Atrás
                  </Button>
                  <Button type="submit" form="payment-form">
                    Revisar Orden <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <Card className="animate-in slide-in-from-right duration-500 border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5 pb-8">
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Confirmar Orden
                  </CardTitle>
                  <CardDescription>Revisa que todos los datos sean correctos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  
                  {/* Summary Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Contacto</h3>
                      <div className="bg-secondary/30 p-4 rounded-lg text-sm">
                        <p className="font-medium">{customerData?.firstName} {customerData?.lastName}</p>
                        <p className="text-muted-foreground">{customerData?.email}</p>
                        <p className="text-muted-foreground">{customerData?.phone}</p>
                        <Button variant="link" size="sm" className="px-0 h-auto mt-2" onClick={() => setCurrentStep(1)}>Editar</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Envío</h3>
                      <div className="bg-secondary/30 p-4 rounded-lg text-sm">
                        <p className="font-medium">{shippingData?.street} #{shippingData?.number} {shippingData?.apartment}</p>
                        <p className="text-muted-foreground">{shippingData?.comuna}, {shippingData?.city}</p>
                        <p className="text-muted-foreground">{shippingData?.region}</p>
                        <Button variant="link" size="sm" className="px-0 h-auto mt-2" onClick={() => setCurrentStep(2)}>Editar</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Pago</h3>
                    <div className="bg-secondary/30 p-4 rounded-lg text-sm flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">{paymentData?.method}</p>
                        <p className="text-muted-foreground text-xs">Simulación de compra</p>
                      </div>
                      <Button variant="link" size="sm" className="px-0 h-auto" onClick={() => setCurrentStep(3)}>Cambiar</Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Productos</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-zinc-500 text-xs shrink-0 overflow-hidden">
                              {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover"/> : <ShoppingBag className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-medium line-clamp-1">{item.name}</p>
                              <p className="text-muted-foreground text-xs">Cant: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {orderError && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {orderError}
                    </div>
                  )}

                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6 bg-secondary/5">
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Volver
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/10 min-w-[150px]"
                    onClick={handleFinalOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Confirmar y Pagar"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar - Always Visible */}
          <div className="lg:col-span-1 hidden lg:block">
            <Card className="sticky top-8 bg-secondary/10 border-border/60">
              <CardHeader>
                <CardTitle className="text-xl">Resumen de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({getTotalItems()} productos)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                      {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 p-4 text-xs text-muted-foreground rounded-b-lg">
                <p className="text-center w-full">
                  Compra segura y encriptada
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
