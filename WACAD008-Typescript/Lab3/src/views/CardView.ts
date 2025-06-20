import { ItemCarrinho } from "../models/interfacesBase/ItemCarrinhoInterface.js";
import { Produto } from "../models/interfacesBase/ProdutoInterface.js";

declare var bootstrap: any;

export class CartView<T extends Produto> {
  private cartItemsElement: HTMLElement;
  private subtotalElement: HTMLElement;
  private shippingElement: HTMLElement;
  private totalElement: HTMLElement;
  private cartIconBadge: HTMLElement;
  private readonly shippingCost: number = 15.0;

  private addProductModalElement: HTMLElement;
  private addProductForm: HTMLFormElement;
  private productTypeSelect: HTMLSelectElement;
  private addProductModalInstance: any;

  constructor() {
    this.cartItemsElement = document.getElementById("cart-items")!;
    this.subtotalElement = document.getElementById("cart-subtotal")!;
    this.shippingElement = document.getElementById("cart-shipping")!;
    this.totalElement = document.getElementById("cart-total")!;
    this.cartIconBadge = document.querySelector(".badge")!;
    this.addProductModalElement = document.getElementById("addProductModal")!;
    this.addProductForm = document.getElementById(
      "addProductForm"
    ) as HTMLFormElement;
    this.productTypeSelect = document.getElementById(
      "productType"
    ) as HTMLSelectElement;

    if (
      !this.cartItemsElement ||
      !this.subtotalElement ||
      !this.shippingElement ||
      !this.totalElement ||
      !this.cartIconBadge ||
      !this.addProductModalElement ||
      !this.addProductForm ||
      !this.productTypeSelect
    ) {
      throw new Error("Erro ao renderizar UI.");
    }

    this.addProductModalInstance = new bootstrap.Modal(
      this.addProductModalElement
    );

    this.vincularAlteracaoTipoProduto();
  }

  private formatarMoeda(value: number): string {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }

  render(items: ItemCarrinho<T>[], subtotal: number, itemCount: number): void {
    this.cartItemsElement.innerHTML = "";

    if (items.length === 0) {
      this.cartItemsElement.innerHTML =
        '<tr><td colspan="5" class="text-center">Seu carrinho está vazio.</td></tr>';
    } else {
      items.forEach((item) => {
        const row = document.createElement("tr");
        const itemSubtotal = item.produto.valor * item.quantidade;
        row.innerHTML = `
                <td>
                    <h6 class="mb-0">${item.produto.modelo}</h6>
                    <small class="text-muted">${item.produto.fabricante}</small>
                </td>
                <td>${this.formatarMoeda(item.produto.valor)}</td>
                <td>
                    <input
                        type="number"
                        class="form-control form-control-sm quantity-input"
                        value="${item.quantidade}"
                        min="1"
                        data-id="${item.produto.id}"
                    />
                </td>
                <td>${this.formatarMoeda(itemSubtotal)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${
                      item.produto.id
                    }">
                        <i class="fas fa-trash-alt"></i> Remover
                    </button>
                </td>
            `;
        this.cartItemsElement.appendChild(row);
      });
    }

    const shipping = subtotal > 0 ? this.shippingCost : 0.0;
    const total = subtotal + shipping;

    this.subtotalElement.textContent = this.formatarMoeda(subtotal);
    this.shippingElement.textContent = this.formatarMoeda(shipping);
    this.totalElement.textContent = this.formatarMoeda(total);

    const badgeElement = document.querySelector(".navbar .badge");
    if (badgeElement) {
      const badgeText =
        itemCount === 1 ? "item no carrinho" : "itens no carrinho";
      badgeElement.innerHTML = `
            ${itemCount} <span class="visually-hidden">${badgeText}</span>
        `;
    }
  }

  vincularRemoverItem(handler: (id: string) => void): void {
    this.cartItemsElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const removeButton = target.closest(".remove-btn") as HTMLButtonElement;
      if (removeButton) {
        const id = removeButton.dataset.id!;
        handler(id);
      }
    });
  }

  vincularAtualizarQuantidade(
    handler: (id: string, quantity: number) => void
  ): void {
    this.cartItemsElement.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      if (target.classList.contains("quantity-input")) {
        const id = target.dataset.id!;
        let quantity = parseInt(target.value, 10);
        if (isNaN(quantity) || quantity < 1) {
          quantity = 1;
          target.value = "1";
        }
        handler(id, quantity);
      }
    });
  }

  private vincularAlteracaoTipoProduto(): void {
    this.productTypeSelect.addEventListener("change", () => {
      const selectedType = this.productTypeSelect.value;
      // Esconde todos os campos
      document.querySelectorAll(".product-specific").forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
      // Mostra o campo do tipo selecionado
      if (selectedType) {
        const fieldsToShow = document.getElementById(`${selectedType}-fields`);
        if (fieldsToShow) {
          fieldsToShow.style.display = "block";
        }
      }
    });
  }

  vincularEnvioFormularioAdicionarProduto(
    handler: (formData: any) => void
  ): void {
    this.addProductForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = {
        type: (document.getElementById("productType") as HTMLSelectElement)
          .value,
        model: (document.getElementById("productModel") as HTMLInputElement)
          .value,
        manufacturer: (
          document.getElementById("productManufacturer") as HTMLInputElement
        ).value,
        value: (document.getElementById("productValue") as HTMLInputElement)
          .value,
        memory: (document.getElementById("celularMemory") as HTMLInputElement)
          .value,
        resolution: (
          document.getElementById("tvResolution") as HTMLInputElement
        ).value,
        size: (document.getElementById("tvSize") as HTMLInputElement).value,
        aro: (document.getElementById("bicicletaAro") as HTMLInputElement)
          .value,
      };

      handler(formData);
      this.addProductModalInstance.hide();
      this.addProductForm.reset();
      this.productTypeSelect.dispatchEvent(new Event("change"));
    });
  }
}
