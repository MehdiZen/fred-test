"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "app/components/ui/card";
import { Separator } from "app/components/ui/separator";
import { Upload, Link, Eye } from "lucide-react";
import { Skeleton } from "app/components/ui/skeleton";

interface IResponse {
  caption: string;
}

export function Welcome() {
  const [image, setImage] = useState<File | null>(null);
  const [imageB64, setImageB64] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [iaResponse, setIaResponse] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageB64(base64String);
        setImageUrl("");
      };
      reader.readAsDataURL(event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };

  const handleUrlChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIaResponse(undefined);
    validateUrl(event.target.value);
    setImageUrl(event.target.value);
    setImage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (image || imageUrl) {
      const sentImage = image ? imageB64 : imageUrl;

      fetch("http://localhost:3265/api/generateCaption", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({ sentImage }),
      })
        .then(async (data) => {
          const response = (await data.json()) as IResponse;
          setIaResponse(response.caption);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIaResponse(
            "Une erreur s'est produite lors de l'analyse de l'image."
          );
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const validateUrl = (value: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    setIsUrlValid(pattern.test(value));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl lg:text-3xl text-center">
                Ajouter une image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="imageUrl"
                      className="text-sm md:text-base lg:text-lg font-medium"
                    >
                      Entrer un lien d'image
                    </label>
                  </div>
                  <Input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className={
                      !isUrlValid && imageUrl.length > 4 ? "border-red-500" : ""
                    }
                  />
                  {!isUrlValid && imageUrl.length > 4 && (
                    <p className="text-red-500 text-xs mt-1">
                      Merci de rentrer une URL valide (http(s)://...)
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs md:text-sm uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor="images"
                      className="text-sm md:text-base lg:text-lg font-medium"
                    >
                      Sélectionner une image
                    </label>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-6 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="flex flex-col items-center justify-center cursor-pointer w-full text-center"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm md:text-base lg:text-lg font-medium">
                          {image ? image.name : "Cliquez pour parcourir"}
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground mt-1">
                          {image
                            ? `${(image.size / 1024).toFixed(2)} KB`
                            : "Formats acceptés: JPG, PNG, GIF"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <CardFooter className="px-0 pt-2">
                  <Button
                    type="submit"
                    className="w-full text-sm md:text-base lg:text-lg"
                    disabled={isLoading || (!image && !isUrlValid)}
                  >
                    {isLoading ? "Analyse en cours..." : "Analyser"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl lg:text-3xl text-center flex items-center justify-center gap-2">
                <Eye className="h-6 w-6" />
                <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent font-serif">
                  Agamotto
                </span>
              </CardTitle>
              <CardDescription className="text-center">
                L'intelligence artificielle qui analyse vos images
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {isUrlValid || image && (
                <div className="relative w-full max-w-md mb-6 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={!image ? imageUrl : imageB64}
                    alt="Image selectionnée"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {isLoading ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center space-x-4"></div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : iaResponse ? (
                <div className="w-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                      <p
                        className="font-serif text-lg leading-relaxed italic"
                        contentEditable="true"
                      >
                        {iaResponse}
                      </p>
                      <div className="mt-2 text-xs text-right text-muted-foreground">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Eye className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">
                    Soumettez une image pour obtenir l'analyse d'Agamotto
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
