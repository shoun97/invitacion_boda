// components/RSVPForm.tsx
'use client';

import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface RSVPFormProps {
    codigo: string;
    name: string;
    title: string;
    yaConfirmado: boolean;
    asiste: string;
    mensaje: string | null;
}



export default function RSVPForm({ codigo, name, title, yaConfirmado, mensaje, asiste }: RSVPFormProps) {
    const [formData, setFormData] = useState({
        name,
        title,
        attending: '',
        message: ''
    });

    const [respuestaFinal, setRespuestaFinal] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase
            .from('invitaciones')
            .update({
                asiste: formData.attending,
                descripcion: formData.message
            })
            .eq('codigo', codigo);

        if (!error) {
            setRespuestaFinal(formData.attending);
            setIsSubmitted(true);
        }
    };

    if (yaConfirmado) {
        return (
            <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl mb-16 text-center">
                <Heart className="text-rose-400 w-16 h-16 mx-auto mb-6 animate-pulse" />
                <h4 className="font-dancing text-3xl text-rose-800 mb-4">
                    Ya confirmaste tu asistencia
                </h4>
                <p className="text-lg text-rose-600 mb-4">
                    Tu respuesta fue: <strong className="capitalize">{asiste}</strong>
                </p>

                {mensaje && (
                    <div className="text-rose-500 italic border-t border-rose-200 pt-4">
                        “{mensaje}”
                    </div>
                )}
            </div>
        );
    }

    if (isSubmitted) {
        const mensajes: Record<string, string> = {
            'si': '¡Nos vemos el día de la boda!',
            'no': 'Lamentamos que no puedas acompañarnos. ¡Gracias por avisar!',
            'tal-vez': 'Esperamos que puedas conectarte. ¡Gracias por tu respuesta!'
        };

        return (
            <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl mb-16 text-center">
                <Heart className="text-rose-400 w-16 h-16 mx-auto mb-6 animate-pulse" />
                <h4 className="font-dancing text-3xl text-rose-800 mb-4">
                    ¡Gracias por confirmar!
                </h4>
                <p className="text-lg text-rose-600">
                    {mensajes[respuestaFinal] ?? 'Tu respuesta ha sido recibida.'}
                </p>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl mb-16">
            <div className="text-center mb-8">


                <div className="flex items-center justify-center mb-6">
                    <Heart className="text-rose-500 w-12 h-12 animated-float" />
                </div>
                <h3 className="font-dancing text-4xl text-rose-800 mb-4">
                    Confirma tu Asistencia
                </h3>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl mb-10 text-center shadow-md border border-rose-200">
                    <p className="text-lg md:text-xl text-rose-800 font-medium mb-2">
                        {formData.name},
                    </p>
                    <p className="text-rose-700 leading-relaxed whitespace-pre-line">
                        Con alegría y gratitud a Dios,<br />
                        <strong>Igmar 🤍 Manuel</strong><br /><br />
                        Invitamos a celebrar el día en que diremos "Sí, para siempre".<br /><br />
                        A pesar de las fronteras que nos separaron,<br />
                        las leyes que aún nos limitan,<br />
                        y la distancia que alguna vez nos desafió,<br />
                        Dios escribió nuestro camino con letras de fe,<br />
                        paciencia y un amor que todo lo puede.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-rose-700 mb-2">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            readOnly
                            value={formData.name}
                            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                            placeholder="Tu nombre completo"
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-rose-700 mb-2">
                            Título/Relación
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            readOnly
                            value={formData.title}
                            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                            placeholder="Ej: Amigo, Familiar, Compañero..."
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="attending" className="block text-sm font-medium text-rose-700 mb-2">
                        ¿Podrás acompañarnos virtualmente? *
                    </label>
                    <select
                        id="attending"
                        name="attending"
                        required
                        value={formData.attending}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="si">¡Sí, estaré presente virtualmente!</option>
                        <option value="no">No podré acompañarlos</option>
                        <option value="tal-vez">Tal vez pueda conectarme</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-rose-700 mb-2">
                        Mensaje para los novios
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                        placeholder="Comparte tus buenos deseos para Igmar y Manuel..."
                    ></textarea>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform"
                    >
                        <Send className="w-5 h-5" />
                        Confirmar Asistencia
                    </button>
                </div>
            </form>
        </div>
    );
}
