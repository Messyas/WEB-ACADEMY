import streamlit as st
import pandas as pd
import plotly.express as px

# ======================
# Configuração da Página
# ======================
st.set_page_config(page_title="Dashboard Usuários", layout="wide")

# ======================
# Estilo Personalizado
# ======================
st.markdown("""
    <style>
        .main {
            background-color: #1E3A5F;
            color: #F0F4F8;
        }
        .stTabs [role="tablist"] button {
            font-weight: bold;
            border-radius: 8px;
            padding: 6px 12px;
            background-color: #274472;
            color: white;
        }
        .stTabs [role="tablist"] button[aria-selected="true"] {
            background-color: #41729F;
            color: #FFFFFF;
        }
        /* Estilo da Sidebar */
        [data-testid="stSidebar"] {
            background-color: #1E3A5F;
        }
    </style>
""", unsafe_allow_html=True)

# ======================
# Carregando Dados (Exemplo)
# ======================
# No seu caso, você usaria: df = pd.read_csv("usuarios_limpo.csv", parse_dates=["data_cadastro"])
data = {
    'user_id': range(365),
    'estado': ['SP', 'RJ', 'MG', 'BA', 'AM', 'RJ', 'RS', 'PE', 'CE', 'PR'] * 36 + ['SP', 'RJ', 'MG', 'BA', 'AM'],
    'data_cadastro': pd.to_datetime(pd.date_range('2023-01-01', periods=365, freq='D')),
    'valor_ultima_compra': [150, 200, 120, 300, 50, 250, 80, 180, 220, 130] * 36 + [150, 200, 120, 300, 50]
}
df = pd.DataFrame(data)
df['data_cadastro'] = pd.to_datetime(df['data_cadastro'])

# ======================
# Barra Lateral (Sidebar) com Filtros
# ======================
st.sidebar.header("Filtros")

# Obter lista única de estados para o filtro
lista_estados = sorted(df['estado'].unique())

# Filtro multiselect para estados
estados_selecionados = st.sidebar.multiselect(
    "Selecione o Estado",
    options=lista_estados,
    default=lista_estados  # Por padrão, todos os estados são selecionados
)

# --- Filtrar o DataFrame com base na seleção ---
if estados_selecionados:
    df_filtrado = df[df['estado'].isin(estados_selecionados)]
else:
    # Se nada for selecionado, usa o dataframe completo para não quebrar os gráficos
    df_filtrado = df.copy()

# ======================
# Gráficos (agora usando df_filtrado)
# ======================

# Mapa coroplético
# Este gráfico não precisa ser filtrado, pois ele mostra a visão geral.
# Mas podemos destacar os estados selecionados se quisermos.
usuarios_por_estado = df['estado'].value_counts().reset_index()
usuarios_por_estado.columns = ['estado', 'quantidade']
fig_mapa = px.choropleth(
    usuarios_por_estado,
    geojson="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
    locations='estado',
    featureidkey="properties.sigla",
    color='quantidade',
    color_continuous_scale="Blues",
    scope="south america",
    title="Distribuição de Usuários por Estado"
)
fig_mapa.update_geos(fitbounds="locations", visible=False)


# Histograma de valores
fig_hist_valor = px.histogram(
    df_filtrado, x="valor_ultima_compra", nbins=30, title="Distribuição do Valor das Compras",
    color_discrete_sequence=["#4A90E2"]
)

# Boxplot por estado
fig_box_valor_estado = px.box(
    df_filtrado, x="estado", y="valor_ultima_compra", title="Distribuição de Compras por Estado",
    color_discrete_sequence=["#50C878"]
)

# Valor médio ao longo do tempo
df_filtrado["mes"] = df_filtrado["data_cadastro"].dt.to_period("M").astype(str)
valor_medio = df_filtrado.groupby("mes")["valor_ultima_compra"].mean().reset_index()
fig_valor_medio_mes = px.line(
    valor_medio, x="mes", y="valor_ultima_compra", markers=True,
    title="Evolução do Valor Médio das Compras",
    color_discrete_sequence=["#F5A623"]
)

# Evolução dos cadastros
df_copy = df_filtrado.copy() 
df_copy["mes_cadastro"] = df_copy["data_cadastro"].dt.to_period("M").astype(str)
cadastros_por_mes = df_copy.groupby("mes_cadastro").size().reset_index(name="Cadastros")
fig_evolucao = px.line(
    cadastros_por_mes, x="mes_cadastro", y="Cadastros", markers=True,
    title="Evolução dos Cadastros", color_discrete_sequence=["#FF6F61"]
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
    color_continuous_scale="Blues", title="Concentração de Cadastros por Dia e Hora"
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

    st.subheader("Evolução do Valor Médio das Compras")
    st.plotly_chart(fig_valor_medio_mes, use_container_width=True)

with aba3:
    st.subheader("Quando Eles se Tornam Clientes?")
    col1, col2 = st.columns(2)
    with col1:
        st.plotly_chart(fig_heatmap_atividade, use_container_width=True)
    with col2:
        st.plotly_chart(fig_evolucao, use_container_width=True)