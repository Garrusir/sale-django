from import_export import resources
from .models import Sale

class SaleResource(resources.ModelResource):
    class Meta:
        model = Sale