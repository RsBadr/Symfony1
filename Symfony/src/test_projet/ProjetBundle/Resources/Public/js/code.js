$(function () {
    $('#projetName').one('keydown', function () {
        $('.hidden').fadeIn('slow').removeClass('hidden');
    }).val('');
    $('#projetDesc').val('');
});