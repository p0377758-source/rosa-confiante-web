import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCart, getCartTotal } from "@/lib/cart";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckoutStep = "identification" | "delivery" | "payment";

const Checkout = () => {
  const [step, setStep] = useState<CheckoutStep>("identification");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    cpf: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const cart = getCart();
  const total = getCartTotal();

  const steps = [
    { id: "identification", label: "Identificação" },
    { id: "delivery", label: "Entrega" },
    { id: "payment", label: "Pagamento" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleNext = () => {
    if (step === "identification") setStep("delivery");
    else if (step === "delivery") setStep("payment");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <div className="flex justify-between mb-12">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-semibold mb-2",
                      index < currentStepIndex
                        ? "bg-success text-success-foreground"
                        : index === currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {index < currentStepIndex ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm font-medium text-center">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2 mt-[-20px]",
                      index < currentStepIndex ? "bg-success" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === "identification" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Identificação</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(99) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="Nome e Sobrenome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="123.456.789-12"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                    <p className="font-semibold mb-2">Usamos seus dados de forma 100% segura para:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Enviar o seu comprovante de compra e pagamento</li>
                      <li>• Ativar a sua garantia de devolução</li>
                      <li>• Acompanhar o andamento do seu pedido</li>
                    </ul>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleNext}>
                    Confirmar Dados
                  </Button>
                </div>
              )}

              {step === "delivery" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Endereço de Entrega</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        placeholder="12345-000"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        placeholder="Rua, Avenida, Alameda"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        placeholder="3213"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apartamento, unidade..."
                        value={formData.complement}
                        onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Centro"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        placeholder="Sua cidade"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-semibold text-success mb-1">Frete Grátis</p>
                    <p className="text-sm text-muted-foreground">
                      Entrega em 10 a 12 dias úteis
                    </p>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleNext}>
                    Ir para Pagamento
                  </Button>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Pagamento</h2>
                  
                  <div className="bg-secondary/50 rounded-lg p-6 text-center">
                    <p className="text-lg mb-4">
                      Ao clicar em "Gerar PIX", você será encaminhado para um ambiente seguro
                      para finalizar seu pagamento.
                    </p>
                    <Button size="lg" className="bg-success hover:bg-success/90">
                      Gerar PIX
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Garantias:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Reembolso em até 15 dias</li>
                      <li>✓ Rastreio via e-mail em até 5 dias úteis</li>
                      <li>✓ 15.623 avaliações positivas no Reclame Aqui</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Resumo</h2>
                
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 py-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-success font-semibold">
                    <span>Frete</span>
                    <span>Grátis</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
