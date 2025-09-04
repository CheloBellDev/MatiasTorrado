from django.core.management.base import BaseCommand
from plans.models import Plan

class Command(BaseCommand):
    help = "Carga datos de ejemplo de Programas/Planes"

    def handle(self, *args, **options):
        data = [
            dict(title='Inicial', description='Evaluación integral + plan base personalizado', price='50.00'),
            dict(title='Mensual', description='Seguimiento semanal y educación nutricional', price='120.00'),
            dict(title='Deportivo', description='Rendimiento, recuperación y composición corporal', price='180.00'),
        ]
        created = 0
        for d in data:
            obj, was_created = Plan.objects.get_or_create(title=d['title'], defaults=d)
            created += int(was_created)
        self.stdout.write(self.style.SUCCESS(f"OK: {created} creados, {len(data)-created} existentes"))
