import graphene
from graphene_django import DjangoObjectType
from sale.models import Sale
from sale.models import Store

class SaleType(DjangoObjectType):
    class Meta:
        model = Sale
class StoreType(DjangoObjectType):
    class Meta:
        model = Store
class Query(graphene.ObjectType):
    sales = graphene.List(SaleType)
    stores = graphene.List(StoreType)

    def resolve_sales(self, info, **kwargs):
        return Sale.objects.all()

    def resolve_stores(self, info, **kwargs):
        return Store.objects.all()

class CreateSale(graphene.Mutation):
    title = graphene.String()
    description = graphene.String()
    date_start = graphene.String()
    date_end = graphene.String()
    price_old = graphene.Float()
    price_new = graphene.Float()
    store_id = graphene.Int()


    class Arguments:
        title = graphene.String()
        description = graphene.String()
        date_start = graphene.String()
        date_end = graphene.String()
        price_old = graphene.Float()
        price_new = graphene.Float()
        store_id = graphene.Int()


    def mutate(self, info, title, description, date_start, date_end, price_old, price_new, store_id):
        store = Store.objects.get(id=store_id)
        sale = Sale(
          title=title,
          description=description,
          date_start=date_start,
          date_end=date_end,
          price_old=price_old,
          price_new=price_new,
          store=store
          )
        sale.save()

        return CreateSale(
            title=sale.title,
            description=sale.description,
            date_start=sale.date_start,
            date_end=sale.date_end,
            price_old=sale.price_old,
            price_new=sale.price_new,
            store_id=sale.store_id
        )

class Mutation(graphene.ObjectType):
    create_sale = CreateSale.Field()

schema = graphene.Schema(
  query=Query,
  mutation=Mutation
)
