import streamlit as st
import pandas as pd
import plotly.express as px

# =====================================================================
# ESTILOS E CONFIG DE PAG
# =====================================================================
st.set_page_config(
    page_title="Focos de Calor no Brasil em 2024",
    page_icon="🔥",
    layout="wide"
)

st.markdown("""
<style>
    /* Seleciona o container do dataframe */
    [data-testid="stDataFrame"] {
        border-radius: 0px;
    }
    /* Garante que o conteúdo interno também não tenha cantos arredondados */
    [data-testid="stDataFrame"] > div > div {
        border-radius: 0px;
    }
</style>
""", unsafe_allow_html=True)

# =====================================================================
# CARREGAMENTO E CACHE DOS DADOS
# =====================================================================
@st.cache_data
def carregar_dados():
    try:
        df = pd.read_csv("queimadas_amostra.csv")
        return df
    except FileNotFoundError:
        st.error("Erro: O arquivo não foi encontrado.")
        st.stop()

df = carregar_dados()

# =====================================================================
# SIDEBAR
# =====================================================================
st.sidebar.header("Filtros")

lista_estados = sorted(df['estado'].unique())
lista_estados.insert(0, "Todos os Estados")

estado_selecionado = st.sidebar.selectbox(
    "Selecione um Estado",
    options=lista_estados
)

# =====================================================================
# LOGICA DE FILTRAGEM DOS DADOS
# =====================================================================
if estado_selecionado == "Todos os Estados":
    data = df
else:
    data = df[df['estado'] == estado_selecionado]

# =====================================================================
# LAYOUT DO DASHBOARD
# =====================================================================
st.header("Focos de Calor no Brasil em 2024")

# --- NOVO: TEXTO DE PROPÓSITO E LINK DA FONTE ---
st.markdown("""
Este painel interativo apresenta dados sobre focos de calor detectados por satélites no Brasil.
<a href="https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_todos_sats/focos_br_todos-sats_2024.zip" style="text-decoration: none; color: #FF4B4B;"> (Fontes: INPE 2024)</a>
""", unsafe_allow_html=True)


# KPIs 
kpi1, kpi2 = st.columns(2)
with kpi1:
    total_focos = data.shape[0]
    total_focos = f"{total_focos:,}".replace(",", ".")
    st.markdown(f"""
    <div style="display: flex; align-items: baseline; justify-content: center;">
        <p style="font-size: 1.1em; margin-right: 8px; font-weight: 500;">Total de Focos Registrados:</p>
        <p style="font-size: 1.1em; font-weight: bold;">{total_focos}</p>
    </div>
    """, unsafe_allow_html=True)

with kpi2:
    if not data.empty:
        bioma_mais_afetado = data['bioma'].mode()[0]
    else:
        bioma_mais_afetado = "N/A"
    st.markdown(f"""
    <div style="display: flex; align-items: baseline; justify-content: center;">
        <p style="font-size: 1.1em; margin-right: 8px; font-weight: 500;">Bioma Mais Afetado:</p>
        <p style="font-size: 1.1em; font-weight: bold;">{bioma_mais_afetado}</p>
    </div>
    """, unsafe_allow_html=True)

# =====================================================================
# GRAFICOS
# =====================================================================
col1, col2 = st.columns([0.6, 0.4])

# --- MAPA ---
with col1:
    pontos_mapa = data
    if len(pontos_mapa) > 5000:
        pontos_mapa = data.sample(n=5000, random_state=1)

    fig_mapa = px.density_mapbox(
        pontos_mapa, lat='latitude', lon='longitude', radius=8,
        center=dict(lat=-14.2350, lon=-51.9253), zoom=3,
        mapbox_style="carto-positron", color_continuous_scale="inferno"
    )
    fig_mapa.update_layout(
        title_text='Mapa de Densidade de Focos de Calor', title_x=0,
        height=520, margin={"r":0,"t":40,"l":0,"b":0}
    )
    st.plotly_chart(fig_mapa, use_container_width=True)

with col2:
    focos_mes = data.groupby('mes').size().reset_index(name='contagem')
    meses_pt = {
        1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun',
        7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez'
    }
    focos_mes = focos_mes[focos_mes['mes'].between(1, 12)]
    focos_mes['nome_mes_abrev'] = focos_mes['mes'].map(meses_pt)
    focos_mes = focos_mes.sort_values('mes')

    fig_barras_mes = px.bar(
        focos_mes,
        x='nome_mes_abrev',
        y='contagem',
        text_auto='.2s',  
        color='contagem', 
        color_continuous_scale='inferno'
    )
    fig_barras_mes.update_layout(
        title_text='Quantidade de focos de Calor por Mês', title_x=0,
        height=260, margin={"r":20,"t":40,"l":20,"b":10},
        yaxis_title=None, xaxis_title=None
    )
    st.plotly_chart(fig_barras_mes, use_container_width=True)

    st.markdown("**Amostra dos Dados**")
    colunas = ['municipio', 'bioma', 'estado']
    if 'data_pas' in data.columns:
        colunas.insert(0, 'data_pas')
    st.dataframe(
        data[colunas].head(),
        height=200, use_container_width=True
    )