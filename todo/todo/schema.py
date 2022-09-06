import graphene
from graphene import ObjectType


class Query(ObjectType):
    hello_world = graphene.String(default_value='Hello, World!')


schema = graphene.Schema(query=Query)