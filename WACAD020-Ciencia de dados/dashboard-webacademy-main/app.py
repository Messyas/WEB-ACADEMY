import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Dashboard Usuários", layout="wide")

@st.cache_data
def carregar_dados():
    try:
        df = pd.read_csv("usuarios_limpo.csv", parse_dates=["data_cadastro"])
        return df
    except FileNotFoundError:
        st.error("Erro: O arquivo 'usuarios_limpo.csv' não foi encontrado.")
        st.stop()

df = carregar_dados()

# ======================
# Barra lateral
# ======================
st.sidebar.header("Filtros")

lista_estados = sorted(df['estado'].unique())

estados_selecionados = st.sidebar.multiselect(
    "Selecione o Estado",
    options=lista_estados,
    default=lista_estados
)

if not estados_selecionados:
    estados_selecionados = lista_estados

df_filtrado = df[df['estado'].isin(estados_selecionados)]

# --- Mapa ---
usuarios_por_estado = df_filtrado['estado'].value_counts().reset_index()
usuarios_por_estado.columns = ['estado', 'quantidade']
fig_mapa = px.choropleth(
    usuarios_por_estado,
    geojson="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
    locations='estado',
    featureidkey="properties.sigla",
    color='quantidade',
    color_continuous_scale="Blues",
    scope="south america",
    title="Distribuição de Usuários por Estado",
    labels={'quantidade': 'Nº de Usuários'},
    template="streamlit" 
)

fig_mapa.update_geos(fitbounds="locations", visible=False, bgcolor="rgba(0,0,0,0)")
fig_mapa.update_layout(height=525, margin={"r":0,"t":30,"l":0,"b":1})


# Histograma de valores
fig_hist_valor = px.histogram(
    df_filtrado, x="valor_ultima_compra", nbins=30, title="Distribuição do Valor das Compras",
    labels={'valor_ultima_compra': 'Valor da Compra (R$)'},
    template="streamlit" 
)

# Grafico de boxplot por estado
fig_box_valor_estado = px.box(
    df_filtrado, x="estado", y="valor_ultima_compra", title="Distribuição de Compras por Estado",
    labels={
        'valor_ultima_compra': 'Valor da Compra (R$)',
        'estado': 'Estado'
    },
    template="streamlit"
)

# Grafico do valor medio ao longo do tempo 
df_filtrado["mes"] = df_filtrado["data_cadastro"].dt.to_period("M").astype(str)
valor_medio = df_filtrado.groupby("mes")["valor_ultima_compra"].mean().reset_index()
fig_valor_medio_mes = px.line(
    valor_medio, x="mes", y="valor_ultima_compra", markers=True,
    title="Evolução do Valor Médio das Compras",
    labels={
        'valor_ultima_compra': 'Valor Médio da Compra (R$)',
        'mes': 'Mês'
    },
    template="streamlit" 
)

# Evolucao dos cadastros
df_copy = df_filtrado.copy()
df_copy["mes_cadastro"] = df_copy["data_cadastro"].dt.to_period("M").astype(str)
cadastros_por_mes = df_copy.groupby("mes_cadastro").size().reset_index(name="Cadastros")
fig_evolucao = px.line(
    cadastros_por_mes, x="mes_cadastro", y="Cadastros", markers=True,
    title="Evolução dos Cadastros",
    labels={
        'mes_cadastro': 'Mês do Cadastro',
        'Cadastros': 'Nº de Novos Cadastros'
    },
    template="streamlit"
)

# Heatmap de cadastros por hora e dia da semana
df_copy["hora"] = df_copy["data_cadastro"].dt.hour
df_copy['dia_semana_num'] = df_copy['data_cadastro'].dt.dayofweek
dias_map = {0: 'Segunda-feira', 1: 'Terça-feira', 2: 'Quarta-feira', 3: 'Quinta-feira', 4: 'Sexta-feira', 5: 'Sábado', 6: 'Domingo'}
df_copy['dia_semana'] = df_copy['dia_semana_num'].map(dias_map)
cadastros_semana_hora = df_copy.groupby(["dia_semana","hora"]).size().reset_index(name="cadastros")
dias_ordenados = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"]
cadastros_semana_hora["dia_semana"] = pd.Categorical(cadastros_semana_hora["dia_semana"], categories=dias_ordenados, ordered=True)
fig_heatmap_atividade = px.density_heatmap(
    cadastros_semana_hora, x="hora", y="dia_semana", z="cadastros",
    title="Concentração de Cadastros por Dia e Hora",
    labels={
        'hora': 'Hora do Dia',
        'dia_semana': 'Dia da Semana',
        'cadastros': 'Nº de Cadastros'
    },
    template="streamlit"
)

# ======================
# Layout em Abas
# ======================
st.title("Dashboard de Usuários")

aba1, aba2, aba3 = st.tabs(["Usuários", "Compras", "Cadastros"])

with aba1:
    st.subheader("Onde Estão Nossos Usuários?")
    st.plotly_chart(fig_mapa, use_container_width=True)

with aba2:
    st.subheader("Como é o Perfil de Compra?")
    col1, col2 = st.columns(2)
    with col1:
        st.plotly_chart(fig_hist_valor, use_container_width=True)
    with col2:
        st.plotly_chart(fig_box_valor_estado, use_container_width=True)

    st.plotly_chart(fig_valor_medio_mes, use_container_width=True)

with aba3:
    st.subheader("Quando Eles se Tornam Clientes?")
    col1, col2 = st.columns(2)
    with col1:
        st.plotly_chart(fig_heatmap_atividade, use_container_width=True)
    with col2:
        st.plotly_chart(fig_evolucao, use_container_width=True)