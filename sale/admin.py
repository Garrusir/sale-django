from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html

# Register your models here.
from .models import StoreType, Store, Shop, Sale, PromoCode, SpecialOffer, CommentSale, CommentPromoCode, CommentSpecialOffer, Author

class StoreTypeAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'description')
	list_display_links = ('id', 'name')

class StoreAdmin (admin.ModelAdmin):
	list_display = ('id', 'name', 'view_sales',)
	list_display_links = ('id', 'name')
	search_fields = ['name', 'description']

	def view_sales(self, obj):
		print(obj)
		# count = obj.person_set.count()
		url = (
			reverse("admin:sale_sale_changelist")
			+ "?"
			+ urlencode({"store": f"{obj.id}"})
		)
		return format_html('<a href="{}">Sales</a>', url)
	view_sales.short_description = "Sales"

class ShopAdmin(admin.ModelAdmin):
	list_display = ('id', 'address', 'city', 'store', 'storeType')
	ist_display_links = ('id', 'address', 'city', 'store', 'storeType')
	search_fields = ['store', 'address', 'city']

# @admin.register(Sale)
class SaleAdmin(ImportExportModelAdmin):
	list_display = ('id', 'title', 'view_store',)
	list_display_links = ('id', 'title',)
	search_fields = ['title', 'store__name']
	list_filter = ('store__name',)

	def view_store(self, obj):
		url = (
			reverse("admin:sale_shop_changelist")
			+ "?"
			+ urlencode({"store": f"{obj.store.id}"})
		)
		return format_html('<a href="{}">{}</a>', url, obj.store)

class PromoCodeAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'code', 'store')
	list_display_links = ('id', 'title', 'code', 'store')

class SpecialOfferAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'description', 'store')
	list_display_links = ('id', 'title', 'description', 'store')

class CommentSaleAdmin(admin.ModelAdmin):
	list_display = ('id', 'author', 'message', 'date', 'sale')
	list_display_links = ('id', 'author', 'message', 'date', )

class CommentPromoCodeAdmin(admin.ModelAdmin):
	list_display = ('id', 'author', 'message', 'date', 'code')
	list_display_links = ('id', 'author', 'message', 'date', )

class CommentSpecialOfferAdmin(admin.ModelAdmin):
	list_display = ('id', 'author', 'message', 'date', 'sale')
	list_display_links = ('id', 'author', 'message', 'date', )

class AuthorAdmin(admin.ModelAdmin):
	list_display = ('id', 'name',)
	list_display_links = ('id', 'name',)

admin.site.register(StoreType, StoreTypeAdmin)
admin.site.register(Store, StoreAdmin)
admin.site.register(Shop, ShopAdmin)
admin.site.register(Sale, SaleAdmin)
admin.site.register(PromoCode, PromoCodeAdmin)
admin.site.register(SpecialOffer, SpecialOfferAdmin)
admin.site.register(CommentSale, CommentSaleAdmin)
admin.site.register(CommentPromoCode, CommentPromoCodeAdmin)
admin.site.register(CommentSpecialOffer, CommentSpecialOfferAdmin)
admin.site.register(Author, AuthorAdmin)

