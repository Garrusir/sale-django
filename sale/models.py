from django.db import models

class StoreType(models.Model):
	name = models.CharField(max_length=150);
	description = models.CharField(max_length=300);

	def __str__(self):
		return self.name

class Store(models.Model):
	name = models.CharField(max_length=150)
	description = models.CharField(max_length=300)
	link = models.CharField(max_length=150)
	storeType = models.ForeignKey('StoreType', related_name='stores', on_delete=models.CASCADE, default=0,)

	def __str__(self):
		return self.name

class Shop(models.Model):
	address = models.CharField(max_length=300)
	city = models.CharField(max_length=150)
	store = models.ForeignKey('Store', related_name='shops', on_delete=models.CASCADE)
	storeType = models.ForeignKey('StoreType', related_name='shops', on_delete=models.CASCADE)

# class SaleType(models.Model)

class Sale(models.Model):
	title = models.CharField(max_length=150)
	description = models.CharField(max_length=300)
	image = models.CharField(default = 'https://picsum.photos/300/200', max_length=300)
	date_start = models.DateTimeField()
	date_end = models.DateTimeField()
	price_old = models.DecimalField(default = 0, max_digits=7, decimal_places=2)
	price_new = models.DecimalField(default = 0, max_digits=7, decimal_places=2)
	store = models.ForeignKey('Store', related_name='sales', on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class PromoCode(models.Model):
	title = models.CharField(max_length=150)
	description = models.CharField(max_length=300)
	date_start = models.DateTimeField()
	date_end = models.DateTimeField()
	code = models.CharField(max_length=100)
	store = models.ForeignKey('Store', related_name='promoCodes', on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class SpecialOffer(models.Model):
	title = models.CharField(max_length=150)
	description = models.CharField(max_length=300)
	date_start = models.DateTimeField()
	date_end = models.DateTimeField()
	store = models.ForeignKey('Store', related_name='specialOffers', on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class CommentSale(models.Model):
	author = models.ForeignKey('Author', related_name='commentSales', on_delete=models.CASCADE)
	message = models.CharField(max_length=300)
	date = models.DateTimeField(auto_now_add=True)
	sale = models.ForeignKey('Sale', related_name='commentSales', on_delete=models.CASCADE)

	def __str__(self):
		return self.message

class CommentPromoCode(models.Model):
	author = models.ForeignKey('Author', related_name='commentPromoCodes', on_delete=models.CASCADE)
	message = models.CharField(max_length=300)
	date = models.DateTimeField(auto_now_add=True)
	code = models.ForeignKey('PromoCode', related_name='commentPromoCodes', on_delete=models.CASCADE)

	def __str__(self):
		return self.message

class CommentSpecialOffer(models.Model):
	author = models.ForeignKey('Author', related_name='commentSpecialOffers', on_delete=models.CASCADE)
	message = models.CharField(max_length=300)
	date = models.DateTimeField(auto_now_add=True)
	sale = models.ForeignKey('SpecialOffer', related_name='commentSpecialOffers', on_delete=models.CASCADE)

	def __str__(self):
		return self.message

class Author(models.Model):
	name = models.CharField(default='default name', max_length=150)
	date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name
