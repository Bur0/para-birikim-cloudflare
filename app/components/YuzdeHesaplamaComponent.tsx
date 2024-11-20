import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "~/components/ui/modal";

export default function YuzdeHesaplamaComponent() {
  const [basicCalculator, setBasicCalculator] = useState({
    number: "",
    percentage: "",
    result: null as number | null,
  });

  const [increaseCalculator, setIncreaseCalculator] = useState({
    number: "",
    percentage: "",
    result: null as number | null,
  });

  const [whatPercentageCalculator, setWhatPercentageCalculator] = useState({
    number1: "",
    number2: "",
    result: null as number | null,
  });

  const [percentageChangeCalculator, setPercentageChangeCalculator] = useState({
    oldValue: "",
    newValue: "",
    result: null as number | null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    result: "",
  });

  const calculateBasicPercentage = () => {
    const number = parseFloat(basicCalculator.number);
    const percentage = parseFloat(basicCalculator.percentage);
    if (!isNaN(number) && !isNaN(percentage)) {
      const result = (number * percentage) / 100;
      setBasicCalculator({
        ...basicCalculator,
        result,
      });
      setModalContent({
        title: "Basit Yüzde Hesaplama Sonucu",
        description: `${number} sayısının %${percentage}'i`,
        result: result.toFixed(2),
      });
      setIsModalOpen(true);
    }
  };

  const calculateIncrease = () => {
    const number = parseFloat(increaseCalculator.number);
    const percentage = parseFloat(increaseCalculator.percentage);
    if (!isNaN(number) && !isNaN(percentage)) {
      const result = number * (1 + percentage / 100);
      setIncreaseCalculator({
        ...increaseCalculator,
        result,
      });
      setModalContent({
        title: "Artış/Azalış Hesaplama Sonucu",
        description: `${number} değerinin %${percentage} ${percentage >= 0 ? "artışı" : "azalışı"}`,
        result: result.toFixed(2),
      });
      setIsModalOpen(true);
    }
  };

  const calculateWhatPercentage = () => {
    const number1 = parseFloat(whatPercentageCalculator.number1);
    const number2 = parseFloat(whatPercentageCalculator.number2);
    if (!isNaN(number1) && !isNaN(number2) && number2 !== 0) {
      const result = (number1 / number2) * 100;
      setWhatPercentageCalculator({
        ...whatPercentageCalculator,
        result,
      });
      setModalContent({
        title: "Yüzde Oranı Hesaplama Sonucu",
        description: `${number1} sayısı ${number2} sayısının yüzdesi`,
        result: `%${result.toFixed(2)}`,
      });
      setIsModalOpen(true);
    }
  };

  const calculatePercentageChange = () => {
    const oldValue = parseFloat(percentageChangeCalculator.oldValue);
    const newValue = parseFloat(percentageChangeCalculator.newValue);
    if (!isNaN(oldValue) && !isNaN(newValue) && oldValue !== 0) {
      const result = ((newValue - oldValue) / oldValue) * 100;
      setPercentageChangeCalculator({
        ...percentageChangeCalculator,
        result,
      });
      setModalContent({
        title: "Yüzde Değişimi Hesaplama Sonucu",
        description: `${oldValue} değerinden ${newValue} değerine değişim`,
        result: `%${Math.abs(result).toFixed(2)} ${result >= 0 ? "artış" : "azalış"}`,
      });
      setIsModalOpen(true);
    }
  };

  const clearBasicCalculator = () => {
    setBasicCalculator({
      number: "",
      percentage: "",
      result: null,
    });
  };

  const clearIncreaseCalculator = () => {
    setIncreaseCalculator({
      number: "",
      percentage: "",
      result: null,
    });
  };

  const clearWhatPercentageCalculator = () => {
    setWhatPercentageCalculator({
      number1: "",
      number2: "",
      result: null,
    });
  };

  const clearPercentageChangeCalculator = () => {
    setPercentageChangeCalculator({
      oldValue: "",
      newValue: "",
      result: null,
    });
  };

  return (
    <>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{modalContent.title}</ModalTitle>
            <ModalDescription>{modalContent.description}</ModalDescription>
          </ModalHeader>
          <div className="flex items-center justify-center p-6">
            <Badge variant="secondary" className="text-2xl px-4 py-2">
              {modalContent.result}
            </Badge>
          </div>
        </ModalContent>
      </Modal>

      <div className="space-y-8">
        {/* Basic Percentage Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Basit Yüzde Hesaplama</CardTitle>
            <CardDescription>
              Bir sayının belirli bir yüzdesini hesaplayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="basic-number">Sayı</Label>
                <Input
                  id="basic-number"
                  type="number"
                  value={basicCalculator.number}
                  onChange={(e) =>
                    setBasicCalculator({
                      ...basicCalculator,
                      number: e.target.value,
                    })
                  }
                  placeholder="Örnek: 100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basic-percentage">Yüzde (%)</Label>
                <Input
                  id="basic-percentage"
                  type="number"
                  value={basicCalculator.percentage}
                  onChange={(e) =>
                    setBasicCalculator({
                      ...basicCalculator,
                      percentage: e.target.value,
                    })
                  }
                  placeholder="Örnek: 15"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculateBasicPercentage}>Hesapla</Button>
                <Button variant="outline" onClick={clearBasicCalculator}>
                  Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Increase/Decrease Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Artış/Azalış Hesaplama</CardTitle>
            <CardDescription>
              Bir sayının belirli bir yüzde kadar artmış veya azalmış değerini
              hesaplayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="increase-number">Başlangıç Değeri</Label>
                <Input
                  id="increase-number"
                  type="number"
                  value={increaseCalculator.number}
                  onChange={(e) =>
                    setIncreaseCalculator({
                      ...increaseCalculator,
                      number: e.target.value,
                    })
                  }
                  placeholder="Örnek: 1000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="increase-percentage">
                  Artış/Azalış Yüzdesi (%)
                </Label>
                <Input
                  id="increase-percentage"
                  type="number"
                  value={increaseCalculator.percentage}
                  onChange={(e) =>
                    setIncreaseCalculator({
                      ...increaseCalculator,
                      percentage: e.target.value,
                    })
                  }
                  placeholder="Örnek: 20"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculateIncrease}>Hesapla</Button>
                <Button variant="outline" onClick={clearIncreaseCalculator}>
                  Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Percentage Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Yüzde Oranı Hesaplama</CardTitle>
            <CardDescription>
              Bir sayının diğer sayının yüzde kaçı olduğunu hesaplayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="what-percentage-number1">İlk Sayı</Label>
                <Input
                  id="what-percentage-number1"
                  type="number"
                  value={whatPercentageCalculator.number1}
                  onChange={(e) =>
                    setWhatPercentageCalculator({
                      ...whatPercentageCalculator,
                      number1: e.target.value,
                    })
                  }
                  placeholder="Örnek: 25"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="what-percentage-number2">İkinci Sayı</Label>
                <Input
                  id="what-percentage-number2"
                  type="number"
                  value={whatPercentageCalculator.number2}
                  onChange={(e) =>
                    setWhatPercentageCalculator({
                      ...whatPercentageCalculator,
                      number2: e.target.value,
                    })
                  }
                  placeholder="Örnek: 100"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculateWhatPercentage}>Hesapla</Button>
                <Button variant="outline" onClick={clearWhatPercentageCalculator}>
                  Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Percentage Change Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Yüzde Değişimi Hesaplama</CardTitle>
            <CardDescription>
              İki sayı arasındaki yüzdelik değişimi hesaplayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="percentage-change-old">Eski Değer</Label>
                <Input
                  id="percentage-change-old"
                  type="number"
                  value={percentageChangeCalculator.oldValue}
                  onChange={(e) =>
                    setPercentageChangeCalculator({
                      ...percentageChangeCalculator,
                      oldValue: e.target.value,
                    })
                  }
                  placeholder="Örnek: 100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="percentage-change-new">Yeni Değer</Label>
                <Input
                  id="percentage-change-new"
                  type="number"
                  value={percentageChangeCalculator.newValue}
                  onChange={(e) =>
                    setPercentageChangeCalculator({
                      ...percentageChangeCalculator,
                      newValue: e.target.value,
                    })
                  }
                  placeholder="Örnek: 150"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculatePercentageChange}>Hesapla</Button>
                <Button variant="outline" onClick={clearPercentageChangeCalculator}>
                  Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
