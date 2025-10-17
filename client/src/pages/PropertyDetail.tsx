import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { 
  MapPin, Bed, Bath, Maximize2, ArrowLeft, Phone, Mail, 
  CheckCircle2, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  // Real bank options for loan calculator (Oct 2025)
  const banks = [
    { name: "SBI", rate: 8.40 },
    { name: "HDFC", rate: 8.75 },
    { name: "AXIS", rate: 8.70 },
    { name: "ICICI", rate: 8.75 },
    { name: "IDFC", rate: 8.85 },
    { name: "CANARA", rate: 8.60 },
    { name: "KOTAK", rate: 8.70 },
  ];
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [, params] = useRoute("/property/:id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Home Loan Calculator State
  const [loanAmountInput, setLoanAmountInput] = useState("");
  const [tenureInput, setTenureInput] = useState("");

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", params?.id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-muted rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-muted rounded animate-pulse" />
              <div className="h-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || (!isLoading && !property)) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              {error ? "Failed to load property. Please try again later." : "Property not found"}
            </p>
            <Link href="/properties">
              <Button className="mt-4" data-testid="button-back-to-properties">
                Back to Properties
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (!property) return null;

  // Calculate default loan amount for placeholder only
  const priceNum = Number(property.price);
  const defaultLoan = Math.round(priceNum * 0.8);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (property.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (property.images?.length || 1) - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/properties">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden mb-8 bg-muted">
          {property.images.length > 0 && (
            <>
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
                data-testid="img-property-main"
              />
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm"
                    onClick={prevImage}
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm"
                    onClick={nextImage}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-primary w-8' : 'bg-card/60'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        data-testid={`button-image-dot-${index}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-3">{property.propertyType}</Badge>
                  <h1 className="font-serif font-bold text-3xl lg:text-4xl mb-2" data-testid="text-property-title">
                    {property.title}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {property.area}, {property.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="font-bold text-3xl text-primary" data-testid="text-property-price">
                    ₹{Number(property.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{property.bedrooms}</span>
                    <span className="text-muted-foreground">Bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{property.bathrooms}</span>
                    <span className="text-muted-foreground">Bathrooms</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{property.sqft}</span>
                  <span className="text-muted-foreground">sqft</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-property-description">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Home Loan Assistance */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Home Loan Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Buying your dream home? We help you get the best home loan offers from leading banks.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Loan Eligibility</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>Up to 80% of property value (₹{defaultLoan.toLocaleString('en-IN')})</li>
                        <li>Tenure: 5 to 30 years</li>
                        <li>Competitive interest rates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">EMI Calculator</h4>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">Bank</label>
                          <select
                            className="w-full border rounded-md px-3 py-2 bg-background text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={selectedBank.name}
                            onChange={e => {
                              const bank = banks.find(b => b.name === e.target.value);
                              if (bank) setSelectedBank(bank);
                            }}
                          >
                            {banks.map(bank => (
                              <option key={bank.name} value={bank.name}>{bank.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">Loan Amount (₹)</label>
                          <Input
                            type="number"
                            min={100000}
                            max={defaultLoan}
                            value={loanAmountInput}
                            placeholder=""
                            onChange={e => setLoanAmountInput(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">Tenure (years)</label>
                          <Input
                            type="number"
                            min={5}
                            max={30}
                            value={tenureInput}
                            placeholder=""
                            onChange={e => setTenureInput(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-medium">Interest Rate (%)</label>
                          <Input
                            type="number"
                            value={selectedBank.rate}
                            readOnly
                            className="w-full bg-muted cursor-not-allowed"
                          />
                          <div className="mt-1 text-xs text-muted-foreground">
                            <strong>Disclaimer:</strong> Interest rates shown are for reference only. Actual rates may vary based on your eligibility, credit score, loan amount, tenure, and bank criteria.
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {(() => {
                            const loanAmount = Number(loanAmountInput);
                            const tenureYears = Number(tenureInput);
                            if (!loanAmountInput || !tenureInput || isNaN(loanAmount) || isNaN(tenureYears) || loanAmount <= 0 || tenureYears <= 0) {
                              return <span>Enter loan amount and tenure to calculate EMI.</span>;
                            }
                            const tenureMonths = tenureYears * 12;
                            const monthlyRate = selectedBank.rate / 100 / 12;
                            const emi = loanAmount && monthlyRate
                              ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1))
                              : 0;
                            return (
                              <span>Approx EMI: <span className="font-semibold text-primary">₹{emi.toLocaleString('en-IN')}</span> / month</span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Documents Required</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      <li>Identity & Address Proof</li>
                      <li>Income Proof (Salary slips/IT returns)</li>
                      <li>Property documents</li>
                      <li>Bank statements</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        window.location.href = 'tel:9908547461';
                      }}
                    >
                      <Phone className="h-4 w-4" />
                      Get Loan Assistance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Amenities Card */}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {property.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Card */}
          <div>
            <Card className="sticky top-24 p-6">
              <h3 className="font-serif font-semibold text-xl mb-4">Interested in this property?</h3>
              <p className="text-muted-foreground mb-6">
                Contact us for more information or to schedule a viewing.
              </p>
              
              <div className="space-y-3">
                <Button
                  className="w-full gap-2"
                  data-testid="button-call"
                  onClick={() => {
                    window.location.href = 'tel:9908547461';
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  data-testid="button-email"
                  onClick={() => {
                    if (window.confirm('Open Gmail to send an email?')) {
                      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=msproperties96@gmail.com', '_blank');
                    }
                  }}
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">+91 9908547461</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">msproperties96@gmail.com</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
