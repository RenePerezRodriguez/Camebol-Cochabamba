import { getPublicMembers } from '@/actions/members';
import { SectionHeader } from '@/components/layout/section-header';
import { SectionDivider } from '@/components/ui/section-divider';
import { MemberGrid } from '@/components/public/member-grid';

export const dynamic = 'force-dynamic';

export default async function DirectorioPage() {
  const allMembers = await getPublicMembers();
  const directorioMembers = allMembers.filter(m => m.type === 'directorio');
  const directivaMembers = allMembers.filter(m => m.type === 'directiva');

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container py-16 md:py-24 relative z-10">

        {/* Directiva Section - NOW FIRST */}
        {directivaMembers.length > 0 && (
          <>
            <SectionHeader
              title="Directiva"
              subtitle="Líderes ejecutivas comprometidas con la gestión diaria."
              className="mb-16"
            />
            <div className="mb-24">
              <MemberGrid
                members={directivaMembers.sort((a, b) => {
                  // Priority sorting for Directiva
                  const roles = ["Presidenta", "Primera Vicepresidenta", "Segunda Vicepresidenta", "Directora Tesorera", "Directora Secretaria"];
                  const roleA = a.role || "";
                  const roleB = b.role || "";

                  const indexA = roles.findIndex(r => roleA.includes(r));
                  const indexB = roles.findIndex(r => roleB.includes(r));

                  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                  if (indexA !== -1) return -1;
                  if (indexB !== -1) return 1;

                  return (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name);
                })}
                variant="secondary"
              />
            </div>
          </>
        )}

        {/* Directorio Section - NOW SECOND */}
        <SectionHeader
          title="Directorio"
          subtitle="Personas que con su experiencia y visión guían a nuestra organización."
          className="mb-16"
        />

        {directorioMembers.length === 0 ? (
          <p className="text-center text-muted-foreground mb-24">No hay miembros del directorio registrados aún.</p>
        ) : (
          <MemberGrid
            members={directorioMembers.sort((a, b) => (a.order || 99) - (b.order || 99) || a.name.localeCompare(b.name))}
            variant="primary"
          />
        )}

      </div>
      <SectionDivider />
    </div>
  );
}
