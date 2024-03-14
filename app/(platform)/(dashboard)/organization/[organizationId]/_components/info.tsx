"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react"
import Image from "next/image"

export const Info = () => {
    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return (
            <div>
                <Info.Skeleton />
            </div>
        )
    }
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image 
                fill
                src={organization?.imageUrl!}
                alt="Organization Logo"
                className="rounded-md object-cover"
                sizes="(100vw - 2rem) 25vw, (100vw - 4rem) 33vw, (100vw - 6rem) 50vw"
                />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard className="w-3 h-3 mr-1" />
                    Gratis
                </div>
            </div>
        </div>
    )
}

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]"/>
                <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2"/>
                    <Skeleton className="h-4 w-[100px]"/>
                </div>
            </div>
        </div>
    )
}