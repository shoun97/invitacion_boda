// hooks/useInvitacion.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

export interface InvitacionData {
  name: string;
  title: string;
  asiste: string;
  descripcion: string | null;
}


export function useInvitacion() {
  const searchParams = useSearchParams();
  const codigo = searchParams.get('codigo');

  console.log({ codigo })

  const [loading, setLoading] = useState(true);
  const [valido, setValido] = useState(false);
  const [yaConfirmado, setYaConfirmado] = useState(false);
  const [formData, setFormData] = useState<InvitacionData>({
    name: '',
    title: '',
    asiste: '',
    descripcion: null
  });


  useEffect(() => {
    const obtenerInvitacion = async () => {
      if (!codigo) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('invitaciones')
        .select('nombre, apellido, titulo, asiste, descripcion')
        .eq('codigo', codigo?.trim() || '');

      if (error) {
        console.error(error);
        setValido(false);
      } else if (!data || data.length === 0) {
        console.warn('No se encontró la invitación con el código:', codigo);
        setValido(false);
      } else {
        const invitacion = data[0];
        setValido(true);
        setYaConfirmado(!!invitacion.asiste);
        setFormData({
          name: `${invitacion.nombre} ${invitacion.apellido}`,
          title: invitacion.titulo,
          asiste: invitacion.asiste,
          descripcion: invitacion.descripcion,
        });

      }


      setLoading(false);
    };

    obtenerInvitacion();
  }, [codigo]);

  return { loading, valido, yaConfirmado, formData, codigo };
}
