'use client';
import { Left } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import CriarUsuario from '@/app/components/CriarUsuario';

export default function Page() {
    const router = useRouter()

    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className="w-full flex flex-col items-center md:mt-3">
            <div onClick={handleGoBack} className='w-fit self-start pl-0 p-1 text-neutral-800 flex gap-1.5 items-center cursor-pointer font-semibold'>
                <div><Left theme="outline" size="24" fill="#333"/></div>
                <span> Voltar </span>
            </div>
            <CriarUsuario /> 
        </div>
    );
}
