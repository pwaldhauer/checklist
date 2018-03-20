<template>

    <div class="">

        <h2>Checkliste editieren</h2>

        <div class="form-group">
            <label for="title">Titel</label>
            <input class="form-control" id="title" type="text" :value="checklist.title"
                   @input="updateField('title', $event.target.value)">
        </div>
        <div class="form-group">
            <label for="creator">Ersteller</label>
            <input class="form-control" id="creator" type="text" :value="checklist.creator"
                   @input="updateField('creator', $event.target.value)">
        </div>

        <div class="form-group">
            <h3>Items</h3>
            <div class="mb-3">
                <button @click.prevent="addItem" class="btn btn-primary">Neuen Punkt hinzufügen</button>
            </div>

            <div v-for="item in checklist.items">

                <div class="row mb-2">
                    <div class="col-sm-10">
                        <input class="form-control" id="check_title" type="text" :value="item.title"
                               @input="updateFieldItem(item.id, 'title', $event.target.value)">

                    </div>

                    <div class="col-sm-2">
                        <button @click.prevent="removeItem(item.id)" class="btn btn-danger">Löschen</button>
                    </div>
                </div>

            </div>


        </div>

        <div class="form-group">
            <button @click.prevent="save" class="btn btn-primary">Speichern</button>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'ChecklistForm',
        props: {
            id: String,
            title: String,
            creator: String,
            items: Array,
        },

        computed: {
            checklist() {
                return this.$store.state.checklists[this.$route.params.id];
            }
        },

        methods: {
            updateField(field, value) {
                this.$store.commit('updateChecklist', {id: this.checklist.id, field, value})
            },

            updateFieldItem(itemId, field, value) {
                this.$store.commit('updateChecklistItem', {id: this.checklist.id, itemId, field, value})
            },

            save() {
                this.$store.dispatch('saveChecklist', {checklist: this.checklist}).then(() => {
                    this.$router.go(-1);
                })

            },

            addItem() {
                this.$store.commit('addChecklistItem', {
                    id: this.checklist.id
                })
            },

            removeItem(itemId) {
                this.$store.commit('removeChecklistItem', {
                    id: this.checklist.id,
                    itemId
                })
            }
        },
    }
</script>
