import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";

export const meta: MetaFunction = () => {
  return [
    { title: "Para Birikim - Döviz, Altın ve Borsa Takibi" },
    {
      name: "description",
      content: "Güncel döviz kurları, altın fiyatları ve borsa verileri",
    },
  ];
};

export const handle = {
  breadcrumb: "Ana Sayfa",
};

export default function Index() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const tickerData = [
    { symbol: "USD/TRY", value: "31.24", change: "+0.15%" },
    { symbol: "EUR/TRY", value: "33.85", change: "+0.22%" },
    { symbol: "GBP/TRY", value: "39.45", change: "-0.10%" },
    { symbol: "GOLD/TRY", value: "2024.50", change: "+1.25%" },
    { symbol: "BTC/USD", value: "43,250", change: "+2.15%" },
    { symbol: "BIST100", value: "7,850", change: "+0.75%" },
  ];

  const exchangeRates = [
    {
      code: "USD/TRY",
      name: "Dolar",
      rate: "32.15",
      change: "+0.45",
      changePercent: "+1.2"
    },
    {
      code: "EUR/TRY",
      name: "Euro",
      rate: "34.80",
      change: "-0.15",
      changePercent: "-0.4"
    },
    {
      code: "GBP/TRY",
      name: "Sterlin",
      rate: "40.55",
      change: "+0.85",
      changePercent: "+1.8"
    }
  ];

  const goldPrices = [
    {
      code: "GAU/TRY",
      name: "Gram Altın",
      price: "2.150",
      change: "+45",
      changePercent: "+1.8"
    },
    {
      code: "QAU/TRY",
      name: "Çeyrek Altın",
      price: "3.520",
      change: "+75",
      changePercent: "+1.9"
    },
    {
      code: "CAU/TRY",
      name: "Cumhuriyet Altını",
      price: "14.250",
      change: "-120",
      changePercent: "-0.8"
    }
  ];

  const stockMarket = [
    {
      code: "XU100",
      name: "BIST 100",
      value: "9.245,78",
      change: "+145.25",
      changePercent: "+1.65"
    },
    {
      code: "XU030",
      name: "BIST 30",
      value: "10.123,45",
      change: "-89.30",
      changePercent: "-0.75"
    },
    {
      code: "XBANK",
      name: "BIST Bankacılık",
      value: "4.567,89",
      change: "+234.56",
      changePercent: "+2.45"
    }
  ];

  const creditOffers = [
    {
      bank: "Yapı Kredi",
      rate: "2.99",
      term: "36",
      amount: "500.000",
      type: "İhtiyaç Kredisi",
      campaign: "3 Ay Ertelemeli",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    },
    {
      bank: "Garanti BBVA",
      rate: "3.15",
      term: "24",
      amount: "300.000",
      type: "Taşıt Kredisi",
      campaign: "Masrafsız",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    },
    {
      bank: "İş Bankası",
      rate: "2.89",
      term: "48",
      amount: "1.000.000",
      type: "Konut Kredisi",
      campaign: "0.5 Puan İndirimli",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    }
  ];

  const creditCardCampaigns = [
    {
      bank: "Yapı Kredi World",
      title: "Market Alışverişlerinde 500 TL Bonus",
      description: "Seçili marketlerde 2.000 TL ve üzeri alışverişlerde 500 TL bonus",
      validUntil: "31 Mart 2024",
      categories: ["Market", "Gıda"],
      minSpend: "2.000",
      cardImage: "/images/cards/placeholder-card.svg",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    },
    {
      bank: "Garanti Bonus",
      title: "Akaryakıtta %10 Bonus",
      description: "Tüm akaryakıt istasyonlarında %10'a varan bonus fırsatı",
      validUntil: "28 Şubat 2024",
      categories: ["Akaryakıt"],
      minSpend: "300",
      cardImage: "/images/cards/placeholder-card.svg",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    },
    {
      bank: "İş Bankası Maximum",
      title: "Restoranlarda 200 TL MaxiPuan",
      description: "Seçili restoranlarda 1.000 TL üzeri harcamalara 200 TL MaxiPuan",
      validUntil: "15 Mart 2024",
      categories: ["Restoran", "Yeme-İçme"],
      minSpend: "1.000",
      cardImage: "/images/cards/placeholder-card.svg",
      bankLogo: "https://cdn2.enuygun.com/img/finance/uploads/ING_2_4380b2f293.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (tickerData.length * 200));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Scrolling Ticker */}
      <div className="w-full bg-primary text-primary-foreground py-2 overflow-hidden rounded-sm">
        <div 
          className="whitespace-nowrap"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            display: "inline-block",
            transition: "transform 0.05s linear"
          }}
        >
          {[...tickerData, ...tickerData].map((item, index) => (
            <span key={index} className="mx-8 inline-flex items-center">
              <strong>{item.symbol}</strong>
              <span className="ml-2">{item.value}</span>
              <span className={`ml-2 ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Finansal Veriler ve Piyasa Takibi
          </h1>
          <p className="text-lg text-muted-foreground">
            Güncel döviz kurları, altın fiyatları ve borsa verilerini takip edin
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Döviz Kurları Kartı */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Döviz Kurları
                <Badge>Canlı</Badge>
              </CardTitle>
              <CardDescription>Güncel döviz kurları</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {exchangeRates.map((currency, index) => (
                    <Link
                      key={index}
                      to={`/doviz/${currency.code.toLowerCase().split('/')[0]}`}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{currency.code}</span>
                        <Badge variant="outline">{currency.name}</Badge>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-right font-medium">{currency.rate} ₺</span>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={currency.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                            {currency.change}
                          </span>
                          <span className={`${
                            currency.changePercent.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          } flex items-center`}>
                            {currency.changePercent.startsWith('+') ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                              </svg>
                            )}
                            {currency.changePercent}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Altın Fiyatları Kartı */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Altın Fiyatları
                <Badge>Canlı</Badge>
              </CardTitle>
              <CardDescription>Güncel altın fiyatları</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {goldPrices.map((gold, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{gold.name}</span>
                        <Badge variant="outline">{gold.code}</Badge>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-right font-medium">{gold.price} ₺</span>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={gold.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                            {gold.change}
                          </span>
                          <span className={`${
                            gold.changePercent.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          } flex items-center`}>
                            {gold.changePercent.startsWith('+') ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                              </svg>
                            )}
                            {gold.changePercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Borsa Kartı */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Borsa
                <Badge>BIST</Badge>
              </CardTitle>
              <CardDescription>Borsa İstanbul verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {stockMarket.map((stock, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{stock.name}</span>
                        <Badge variant="outline">{stock.code}</Badge>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-right font-medium">{stock.value}</span>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                            {stock.change}
                          </span>
                          <span className={`${
                            stock.changePercent.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          } flex items-center`}>
                            {stock.changePercent.startsWith('+') ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                              </svg>
                            )}
                            {stock.changePercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Kredi ve Kampanyalar Bölümü */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Güncel Kredi Kampanyaları</h2>
            <p className="text-muted-foreground">En avantajlı kredi teklifleri ve özel kampanyalar</p>
          </div>
        
          {/* Kredi Teklifleri */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creditOffers.map((offer, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg" variant="secondary">
                    {offer.campaign}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-24 relative">
                        <img
                          src={offer.bankLogo}
                          alt={`${offer.bank} Logo`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                    <Badge variant="outline">{offer.type}</Badge>
                  </CardTitle>
                  <CardDescription className="font-medium text-primary text-lg">
                    {offer.bank}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Faiz Oranı</span>
                      <span className="font-semibold">%{offer.rate}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Vade</span>
                      <span className="font-semibold">{offer.term} Ay</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Kredi Tutarı</span>
                      <span className="font-semibold">{offer.amount} ₺</span>
                    </div>
                    <Link
                      to={`/kredi/${offer.type.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block w-full text-center bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors mt-4"
                    >
                      Detayları İncele
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Kredi Kartı Kampanyaları */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Kredi Kartı Kampanyaları</h2>
              <p className="text-muted-foreground">Öne çıkan kredi kartı fırsatları</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {creditCardCampaigns.map((campaign, index) => (
                <Card key={index} className="relative overflow-hidden group">
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg" variant="secondary">
                      Min. {campaign.minSpend} ₺
                    </Badge>
                  </div>
                  
                  {/* Bank Logo */}
                  <div className="absolute top-4 left-4 h-8">
                    <img
                      src={campaign.bankLogo}
                      alt={`${campaign.bank} Logo`}
                      className="h-full w-auto object-contain"
                    />
                  </div>

                  {/* Credit Card Image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-primary/5 to-primary/10">
                    <img
                      src={campaign.cardImage}
                      alt={campaign.bank}
                      className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>

                  <CardHeader className="pt-4">
                    <CardTitle className="flex items-center justify-end">
                      <div className="flex gap-2">
                        {campaign.categories.map((category, idx) => (
                          <Badge key={idx} variant="outline">{category}</Badge>
                        ))}
                      </div>
                    </CardTitle>
                    <CardDescription className="font-medium text-primary text-lg">
                      {campaign.title}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {campaign.description}
                      </p>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Son Geçerlilik</span>
                        <span className="text-sm font-medium">{campaign.validUntil}</span>
                      </div>
                      <Link
                        to={`/kampanyalar/${campaign.bank.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block w-full text-center bg-primary/10 text-primary py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors mt-2"
                      >
                        Kampanya Detayları
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
