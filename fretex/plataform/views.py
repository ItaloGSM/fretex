import datetime
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views import View
from .models import Endereco, Pedido, Status, Produto, TipoVeiculo


@method_decorator(login_required, name='dispatch')
class CadastroDeFrete(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'pedidoDeFrete/cadastroFrete.html')
    def post(self, request, *args, **kwargs):
        cep_origem = request.POST.get('cep-origem',False)
        rua_origem = request.POST['rua-origem']
        numero_origem = request.POST['numero-origem']
        estado_origem = request.POST['estado-origem']
        cidade_origem = request.POST['cidade-origem']
        bairro_origem = request.POST['bairro-origem']
        complemento_origem = request.POST['complemento-origem']

        cep_destino  = request.POST.get('cep-destino',False)
        rua_destino  = request.POST['rua-destino'] 
        numero_destino  = request.POST['numero-destino']
        estado_destino  = request.POST['estado-destino']
        cidade_destino  = request.POST['cidade-destino']
        bairro_destino  = request.POST['bairro-destino'] 
        complemento_destino  = request.POST['complemento-destino']

        imagem  = request.POST['imagem']
        produto  = request.POST['produto']
        tipoveiculo  = request.POST['tipoveiculo']
        observacao  = request.POST['observacao']

        nomedestinatario  = request.POST['nomedestinatario']
        data_turno_coleta  = request.POST.get('data_turno_coleta',False)
        data_turno_entrega  = request.POST.get('data_turno_entrega',False)

        #if (cep_origem and rua_origem and numero_origem and estado_origem and cidade_origem and bairro_origem and 
        #cep_destino and rua_destino and numero_destino and estado_destino and cidade_destino and bairro_destino and 
        #imagem and produto and tipoveiculo and data_turno_coleta and data_turno_entrega):
        if True:
            endereco_origem = Endereco( rua = rua_origem, CEP = cep_origem, numero = numero_origem, 
            bairro = bairro_origem, estado = estado_origem, cidade = cidade_origem, complemento = complemento_origem)
            endereco_origem.save()

            endereco_destino = Endereco( rua = rua_destino, CEP = cep_destino, numero = numero_destino,
            bairro = bairro_destino, estado = estado_destino, cidade = cidade_destino, complemento = complemento_destino)
            endereco_destino.save()

            status = Status(descricao = "Em espera")
            status.save()

            produto = Produto(nome = produto, imagem_url = imagem)
            produto.save()
            
            tipo_veiculo = TipoVeiculo(descricao = tipoveiculo)
            tipo_veiculo.save()

            if hasattr(request.user, 'cliente'):
                pedido = Pedido.objects.create(cliente = request.user.cliente, status = status, produto = produto, tipo_veiculo = tipo_veiculo,
                observacao = observacao, nomeDestinatario = nomedestinatario)
                #origem = endereco_origem, 
                #destino = endereco_destino,
                #data_turno_Coleta = data_turno_coleta, 
                #data_turno_Entrega = data_turno_entrega
                return HttpResponseRedirect(reverse('dashboardcliente'))
            else:   
                erro = 'Usuario não logado!'
                return render(request, 'login/', {'erro':erro})
        else:
            erro = 'Informe corretamente os parâmetros necessários!'
            return render(request, 'pedidoDeFrete/cadastroFrete.html', {'erro':erro})


def landing(request):
    return render(request, 'landing.html')

def login(request):
    return render(request, 'login-cadastros/login.html')

def escolhaCadastro(request):
    return render(request, 'login-cadastros/escolhaCadastro.html')

def cadastroCliente(request):
    return render(request, 'login-cadastros/cadastroCliente.html')

def cadastroFreteiro(request):
    return render(request, 'login-cadastros/cadastroFreteiro.html')

def dashboardFreteiro(request):
    return render(request, 'dashboards/dashboardFreteiro.html')

def dashboardCliente(request):
    return render(request, 'dashboards/dashboardCliente.html')

def fretes_index(request):
    return render(request, 'fretes/index.html')

def detalhesFretesDisponiveis(request):
    return render(request, 'fretes/detalhesFretesDisponiveis.html')

def detalhesMeusFretesFreteiro(request):
    return render(request, 'fretes/detalhesMeusFretesFreteiro.html')

def detalhesMeusFretesCliente(request):
    return render(request, 'fretes/detalhesMeusFretesCliente.html')
<<<<<<< Updated upstream

def cadastroDeFrete(request):
    return render(request, 'pedidoDeFrete/cadastroFrete.html')

def perfilCliente(request):
    return render(request, 'perfis/perfilCliente.html')

def perfilFreteiro(request):
    return render(request, 'perfis/perfilFreteiro.html')

def editarPerfilCliente(request):
    return render(request, 'perfis/editarPerfilCliente.html')

def editarPerfilFreteiro(request):
    return render(request, 'perfis/editarPerfilFreteiro.html')

def meusVeiculos(request):
    return render(request, 'perfis/meusVeiculos.html')

def adicionarVeiculo(request):
    return render(request, 'perfis/adicionarVeiculo.html')
=======
>>>>>>> Stashed changes
