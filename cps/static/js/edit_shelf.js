$(function () {
    const list = $("#sortTrue");
    const categories = $("#categories");

    $(".selectpicker").selectpicker();

    $(".selectpicker").on("change", function () {
        var selected = []; //array to store value
        $(this)
            .find("option:selected")
            .each(function (key, value) {
                selected.push(value);
            });
        const elements = list.find(".list-group-item");
        selected.forEach((item) => {
            const exists =
                !!elements.length &&
                !![...elements].find((element) => {
                    return $(element).data("id") === parseInt(item.value);
                });

            if (!exists) {
                const template = `<li class="list-group-item" data-id="${item.value}">${item.innerHTML}</li>`;
                console.log(template)
                list.append(template);
            }
        });
        [...elements].forEach((item, index) => {
            const exists =
                !!selected.length &&
                !![...selected].find((element) => {
                    return parseInt(element.value) === $(item).data("id");
                });

            if (!exists) {
                list.slice(index, 1);
                item.parentNode.removeChild(item);
            }
        });
        console.log(list);
        onUpdate();
    });

    const onUpdate = () => {
        const elements = list.find(".list-group-item");
        const values = [...elements].map((element) => $(element).data("id"));
        categories.val(values.join(","));
    };

    [].forEach.call(list, function (el) {
        Sortable.create(el, {
            group: "sorting",
            animation: 150,
            onSort: onUpdate,
        });
    });
});
