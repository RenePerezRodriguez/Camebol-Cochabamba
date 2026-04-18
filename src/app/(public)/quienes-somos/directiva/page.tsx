import { SectionHeader } from '@/components/layout/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPublicMembers } from '@/actions/members';

export const dynamic = 'force-dynamic';

export default async function DirectivaPage() {
  const allMembers = await getPublicMembers();
  const members = allMembers.filter(m => m.type === 'directiva');

  return (
    <div className="bg-muted/20">
      <div className="container py-16 md:py-24">
        <SectionHeader
          title="Nuestra Directiva"
          subtitle="Conoce a las líderes que conforman la directiva de CAMEBOL Cochabamba."
        />
        {members.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay miembros de la directiva registrados aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member) => {
              const imageUrl = member.imageUrl || '';
              return (
                <Card key={member.id} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                      <AvatarImage src={imageUrl} alt={member.name} className="object-cover" />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
