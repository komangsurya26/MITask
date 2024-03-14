"use client";

import Image from "next/image";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 6,
        });
        if (result && result.response) {
          const newImg = result.response as Array<Record<string, any>>;
          setImages(newImg);
        } else {
          console.error("Gagal fetch images");
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-sky-700" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
          >
            <input
              type="radio"
              name={id}
              id={id}
              checked={selectedImage === image.id}
              className="hidden"
              disabled={pending}
              value={`${image.id} | ${image.urls.thumb} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`}
            />
            <Image
              fill
              alt="image unsplash"
              className="object-cover rounded-sm"
              src={image.urls.thumb}
              sizes="(100vw - 2rem) 25vw, (100vw - 4rem) 33vw, (100vw - 6rem) 50vw"
            />
            {selectedImage === image.id && (
              <div className="absolute w-full h-full flex items-center justify-center bg-black/50 text-[10px] text-white">
                <Check className="w-4 h-4" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute w-full bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:underline p-1 bg-black/50 text-[10px] truncate text-white"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id="image" />
    </div>
  );
};
